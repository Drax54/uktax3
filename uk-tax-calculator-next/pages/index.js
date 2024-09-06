import Head from 'next/head'; // Import Head for SEO
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import styles from '../styles/Menu.module.css'; // Use CSS module for styling
import TaxInfo from '../components/TaxInfo';  // Import the new component

// Registering components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {
    const [income, setIncome] = useState('');
    const [result, setResult] = useState(null);
    const [showStudentLoanOptions, setShowStudentLoanOptions] = useState(false);  // State for toggling student loan options
    const [selectedLoanPlan, setSelectedLoanPlan] = useState(''); // State to track selected student loan plan
    const [activeTab, setActiveTab] = useState(''); // State to manage active tab

    const handleTabClick = () => {
        setShowStudentLoanOptions((prev) => !prev);
        if (showStudentLoanOptions) {
            setSelectedLoanPlan('');
            calculateTax('');
        }
    };


    const handleLoanPlanChange = (event) => {
        const newLoanPlan = event.target.value;
        setSelectedLoanPlan(newLoanPlan);
        calculateTax(newLoanPlan);
    };


    const calculateTax = async (loanPlan) => {
        if (!income) return;

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/calculate_tax',
                { income: parseFloat(income), loanPlan: loanPlan },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            setResult(response.data);
        } catch (error) {
            console.error("Error calculating tax:", error);
        }
    };
    

    // SEO meta tags
    const seo = {
        title: "UK Tax Calculator - Estimate Your Take Home Income",
        description: "Use our UK Tax Calculator to estimate your take home income based on your gross salary. Understand the UK tax system with our comprehensive guide.",
        canonical: "https://yourdomain.com/",
    };

    const barData = {
        labels: ['Tax-Free Allowance', 'Basic Rate (20%)', 'Higher Rate (40%)', 'National Insurance'],
        datasets: [
            {
                label: 'Tax Breakdown for £70,000 Income',
                data: [12570, 37700, 19730, 3350],
                backgroundColor: ['green', 'blue', 'orange', 'purple'],
            },
        ],
    };

    const barOptions = {
        maintainAspectRatio: false,
    };

    const pieData = result ? {
        labels: ['Tax', 'National Insurance', 'Net Income'],
        datasets: [
            {
                data: [
                    result.totalTax,
                    result.nationalInsurance,
                    result.takeHome,
                ],
                backgroundColor: ['red', 'blue', 'green'],
            },
        ],
    } : null;

    const pieOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };


    
    const handleSubmit = (event) => {
        event.preventDefault();
        calculateTax(selectedLoanPlan);
    };

    useEffect(() => {
        if (income) {
            calculateTax(selectedLoanPlan);
        }
    }, [income]);

    const formatCurrency = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return '£ 0.00';
        }
        return `£ ${value.toFixed(2)}`;
    };

    return (
        <>
            {/* Add SEO Meta Tags */}
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <link rel="canonical" href={seo.canonical} />
                <meta name="robots" content="index"></meta>
                {/* Example of schema markup for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "url": seo.canonical,
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": `${seo.canonical}?q={search_term_string}`,
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />
            </Head>
            <Menu />
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1>Take Home Tax Calculator</h1>
                    {/* Form Section */}
                    <form onSubmit={handleSubmit}>
                        <label className={styles.label}>
                            Annual Income before Tax (£):
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                required
                            />
                        </label>

                        <div className={styles.tabMenu}>
                            <button
                                className={`${styles.tabButton} ${showStudentLoanOptions ? styles.active : ''}`}
                                onClick={handleTabClick}
                                type="button"
                            >
                                Student Loan
                            </button>
                        </div>

                        {showStudentLoanOptions && (
                            <div className={styles.studentLoanOptions}>
                                <h2>Select Your Student Loan Plan</h2>
                                {['plan1', 'plan2', 'plan4', 'postgrad'].map((plan) => (
                                    <label key={plan}>
                                        <input
                                            type="radio"
                                            value={plan}
                                            checked={selectedLoanPlan === plan}
                                            onChange={handleLoanPlanChange}
                                        />
                                        {plan === 'plan1' && 'Repayment Plan 1'}
                                        {plan === 'plan2' && 'Repayment Plan 2'}
                                        {plan === 'plan4' && 'Repayment Plan 4 (Scotland)'}
                                        {plan === 'postgrad' && 'Postgraduate Loan'}
                                    </label>
                                ))}
                            </div>
                        )}

                        <button type="submit">Calculate Tax</button>
                    </form>
                    {result && (
                        <div className={styles['content-main']}>
                            <h2>Your Results</h2>
                            <p>
                                Based on the details you have provided and a salary of {formatCurrency(result.income)}, your estimated take home is as follows.
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Gross Income</th>
                                        <th>Taxable Income</th>
                                        <th>Tax</th>
                                        <th>National Insurance</th>
                                        <th>Take Home</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Yearly</td>
                                        <td>{formatCurrency(result.income)}</td>
                                        <td>{formatCurrency(result.taxableIncome)}</td>
                                        <td>{formatCurrency(result.totalTax)}</td>
                                        <td>{formatCurrency(result.nationalInsurance)}</td>
                                        <td>{formatCurrency(result.takeHome)}</td>
                                    </tr>
                                    <tr>
                                        <td>Monthly</td>
                                        <td>{formatCurrency(result.income / 12)}</td>
                                        <td>{formatCurrency(result.taxableIncome / 12)}</td>
                                        <td>{formatCurrency(result.totalTax / 12)}</td>
                                        <td>{formatCurrency(result.nationalInsurance / 12)}</td>
                                        <td>{formatCurrency(result.takeHome / 12)}</td>
                                    </tr>
                                    <tr>
                                        <td>Weekly</td>
                                        <td>{formatCurrency(result.income / 52)}</td>
                                        <td>{formatCurrency(result.taxableIncome / 52)}</td>
                                        <td>{formatCurrency(result.totalTax / 52)}</td>
                                        <td>{formatCurrency(result.nationalInsurance / 52)}</td>
                                        <td>{formatCurrency(result.takeHome / 52)}</td>
                                    </tr>
                                    <tr>
                                        <td>Daily</td>
                                        <td>{formatCurrency(result.income / 365)}</td>
                                        <td>{formatCurrency(result.taxableIncome / 365)}</td>
                                        <td>{formatCurrency(result.totalTax / 365)}</td>
                                        <td>{formatCurrency(result.nationalInsurance / 365)}</td>
                                        <td>{formatCurrency(result.takeHome / 365)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ display: 'flex', marginTop: '20px' }}>
                                <div style={{ flex: '1', marginRight: '20px' }}>
                                    <div className="breakdown">
                                        <h3>£{formatCurrency(result.income)} Annual Gross Income - Tax Breakdown for the 2024 Tax Year</h3>
                                        <ul>
                                            <li>Gross Income: {formatCurrency(result.income)}</li>
                                            <li><b>Your Take Home Monthly Pay: {formatCurrency(result.takeHome / 12)}</b></li>
                                            <li>Tax Free Personal Allowance: £12,570.00</li>
                                            <li>Total Taxable After Allowances: {formatCurrency(result.taxableIncome)}</li>
                                            <li>Basic Rate Tax at 20%: {formatCurrency(result.basicRateTax)}</li>
                                            <li>Total Tax Deducted: {formatCurrency(result.totalTax)}</li>
                                            <li>Class 1 National Insurance Deduction: {formatCurrency(result.nationalInsurance)}</li>
                                            <li>Total Deducted: {formatCurrency(result.totalTax + result.nationalInsurance)}</li>
                                            <li>Net Income: {formatCurrency(result.takeHome)}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div style={{ flex: '1' }}>
                                    {pieData && <Pie data={pieData} options={pieOptions} />}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add the missing sections for explanations and bar charts */}
                    <TaxInfo barData={barData} barOptions={barOptions} />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Home;
