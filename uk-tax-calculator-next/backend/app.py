from flask import Flask, request, jsonify
from flask_cors import CORS
import generate_api_key
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file
API_KEY = 'e25c0185ab04248f85573c0392ffde8e'

app = Flask(__name__)
CORS(app)

# Step 1: Create a decorator to check for the API key
def require_api_key(func):
    def wrapper(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        if api_key and api_key == API_KEY:
            return func(*args, **kwargs)
        else:
            return jsonify({"error": "Unauthorized"}), 401
    wrapper.__name__ = func.__name__
    return wrapper

@app.route('/calculate_tax', methods=['POST'])
# @require_api_key
def calculate_tax():
    if request.is_json:
        data = request.get_json()
        print("Received JSON data:", data)
    else:
        print("Request did not contain JSON data")
        return jsonify({"error": "Invalid request format"}), 400

    income = data.get('income', 0)
    loan_plan = data.get('loanPlan', None)  # Get loan plan from request

    # Define thresholds and rates
    personal_allowance = 12570
    basic_rate_threshold = 37700 + personal_allowance
    higher_rate_threshold = 125140
    additional_rate_threshold = 150000

    # Calculate Personal Allowance Reduction for High Earners
    if income > 100000:
        personal_allowance = max(0, personal_allowance - (income - 100000) / 2)

    # Calculate taxable income
    taxable_income = max(0, income - personal_allowance)

    # Calculate tax
    basic_rate_tax = 0
    higher_rate_tax = 0
    additional_rate_tax = 0

    if taxable_income <= 37700:
        basic_rate_tax = taxable_income * 0.2
    else:
        basic_rate_tax = 37700 * 0.2
        if taxable_income <= higher_rate_threshold:
            higher_rate_tax = (taxable_income - 37700) * 0.4
        else:
            higher_rate_tax = (higher_rate_threshold - 37700) * 0.4
            additional_rate_tax = (taxable_income - higher_rate_threshold) * 0.45

    total_tax = basic_rate_tax + higher_rate_tax + additional_rate_tax

    # National Insurance Calculation
    weekly_income = income / 52  # Calculate weekly income
    ni = 0

    if weekly_income > 967:
        ni = ((967 - 242) * 0.08) + ((weekly_income - 967) * 0.02)
    elif weekly_income > 242:
        ni = (weekly_income - 242) * 0.08

    ni_yearly = ni * 52

    # Student Loan Calculation
    student_loan_repayment = 0
    if loan_plan == 'plan1':
        if income > 20195:
            student_loan_repayment = (income - 20195) * 0.09
    elif loan_plan == 'plan2':
        if income > 27295:
            student_loan_repayment = (income - 27295) * 0.09
    elif loan_plan == 'plan4':
        if income > 25000:
            student_loan_repayment = (income - 25000) * 0.09
    elif loan_plan == 'postgrad':
        if income > 21000:
            student_loan_repayment = (income - 21000) * 0.06

    # Take Home Calculation
    take_home = income - total_tax - ni_yearly - student_loan_repayment

    return jsonify({
        'income': income,
        'personalAllowance': personal_allowance,
        'taxableIncome': taxable_income,
        'basicRateTax': basic_rate_tax,
        'higherRateTax': higher_rate_tax,
        'additionalRateTax': additional_rate_tax,
        'totalTax': total_tax,
        'nationalInsurance': ni_yearly,
        'studentLoanRepayment': student_loan_repayment,
        'takeHome': take_home,
        'takeHomeMonthly': take_home / 12,
        'takeHomeWeekly': take_home / 52
    })

@app.route('/')
def home():
    return "Welcome to the Tax Calculator API!"

if __name__ == '__main__':
    app.run(host='0.0.0.0')
