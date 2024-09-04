import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from '../styles/Menu.module.css'; // Adjust the path based on your directory structure

const TaxInfo = ({ barData, barOptions }) => {
    return (
        <div className={styles.content}>
            <h1>Understanding UK Tax for 2024/25</h1>
            <section>
                <h2>What is Income Tax?</h2>
                <p>
                    Income Tax is a tax you pay on your income, and the amount you pay depends on how much you earn. In the UK, Income Tax is calculated on earnings above a certain threshold, known as the Personal Allowance. For the 2024/25 tax year, this threshold is £12,570. Earnings up to this amount are tax-free. Beyond this threshold, different rates apply based on the income bracket.
                </p>
            </section>

            <section>
                <h2>How is Income Tax Calculated?</h2>
                <p>
                    Income Tax in the UK is calculated based on various income bands and tax rates. The government sets these rates, which can change during the annual budget. For the 2024/25 tax year, the Income Tax bands are as follows:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Income Band</th>
                            <th>Tax Rate</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Up to £12,570</td>
                            <td>0%</td>
                            <td>Personal allowance (tax-free)</td>
                        </tr>
                        <tr>
                            <td>£12,571 to £50,270</td>
                            <td>20%</td>
                            <td>Basic rate</td>
                        </tr>
                        <tr>
                            <td>£50,271 to £125,140</td>
                            <td>40%</td>
                            <td>Higher rate</td>
                        </tr>
                        <tr>
                            <td>Over £125,141</td>
                            <td>45%</td>
                            <td>Additional rate</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <h2>Visualizing the Tax Breakdown</h2>
            <p>
                To provide a clear understanding, here’s a graphical representation of how taxes are distributed based on the different tax bands and the National Insurance contributions.
            </p>
            <div style={{ width: '700px', height: '350px', margin: '0 auto' }}>
                <Bar data={barData} options={barOptions} />
            </div>

            <section>
                <h2>Understanding UK Tax in 2024</h2>
                <p>Understanding the UK tax system can be complex, especially with frequent updates and changes to tax laws. This blog post aims to provide a comprehensive guide to understanding UK taxes in 2024, including the different types of taxes, thresholds, and important deadlines. We will also provide official links for further reading and address frequently asked questions (FAQs).</p>

                {/* Article Sections */}
                <section>
                    <h3>1. Overview of the UK Tax System</h3>
                    <p>The UK tax system is overseen by HM Revenue and Customs (HMRC), which is responsible for collecting taxes, administering tax laws, and ensuring compliance. The main types of taxes that individuals and businesses might encounter include:</p>
                    <ul>
                        <li><b>Income Tax</b>: Paid on most types of income, including earnings from employment, self-employment, pensions, savings, and investments.</li>
                        <li><b>National Insurance Contributions (NICs)</b>: Payments made by both employees and employers to qualify for certain benefits, including the State Pension.</li>
                        <li><b>Value Added Tax (VAT)</b>: A consumption tax charged on most goods and services sold in the UK.</li>
                        <li><b>Corporation Tax</b>: Paid by companies on their profits.</li>
                        <li><b>Capital Gains Tax (CGT)</b>: Charged on the profit when you sell an asset that has increased in value.</li>
                        <li><b>Inheritance Tax</b>: A tax on the estate of someone who has died.</li>
                    </ul>
                </section>

                <section>
                    <h3>2. Income Tax in 2024</h3>
                    <p>Income Tax is typically the most relevant tax for individuals. It is applied on earnings over a certain threshold. In 2024, the tax rates and thresholds are:</p>
                    <ul>
                        <li><b>Personal Allowance</b>: £12,570 (This is the amount of income you can earn before you start paying Income Tax).</li>
                        <li><b>Basic Rate</b>: 20% on income over £12,570 and up to £50,270.</li>
                        <li><b>Higher Rate</b>: 40% on income over £50,270 and up to £150,000.</li>
                        <li><b>Additional Rate</b>: 45% on income over £150,000.</li>
                    </ul>
                    <h4>Changes for 2024:</h4>
                    <p>The key changes to note for 2024 include:</p>
                    <ul>
                        <li>A freeze on the Personal Allowance and tax thresholds until April 2026, as announced in the previous budget.</li>
                        <li>Potential adjustments to tax reliefs and deductions, particularly for higher earners.</li>
                    </ul>
                    <p>For more information on Income Tax, you can visit the <a href="https://www.gov.uk/income-tax-rates">official HMRC page on Income Tax</a>.</p>
                </section>

                <section>
                    <h3>3. National Insurance Contributions (NICs)</h3>
                    <p>National Insurance Contributions are payments made to qualify for certain state benefits. The rates for 2024 are:</p>
                    <ul>
                        <li><b>Class 1</b>: Paid by employees and employers. Employees pay 12% on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. Employers pay 13.8% on earnings above £9,100.</li>
                        <li><b>Class 2</b>: Paid by self-employed individuals, set at a flat rate of £3.15 per week.</li>
                        <li><b>Class 4</b>: Also for the self-employed, 9% on profits between £12,570 and £50,270, and 2% on profits above £50,270.</li>
                    </ul>
                    <p>For more details, visit the <a href="https://www.gov.uk/national-insurance">HMRC National Insurance page</a>.</p>
                </section>

                {/* Add more sections as needed */}

                <section>
                    <h3>9. Frequently Asked Questions (FAQs)</h3>
                    <h4>Q: Do I need to file a tax return?</h4>
                    <p>A: You need to file a tax return if you are self-employed, earn over £100,000, have rental income, or have other untaxed income. More details can be found on the <a href="https://www.gov.uk/self-assessment-tax-returns">HMRC Self-Assessment page</a>.</p>

                    <h4>Q: How do I check my tax code?</h4>
                    <p>A: Your tax code is usually found on your payslip, P60, or your personal tax account online. It indicates the amount of tax-free income you are entitled to. You can learn more on the <a href="https://www.gov.uk/tax-codes">HMRC tax codes page</a>.</p>

                    <h4>Q: What happens if I miss the tax return deadline?</h4>
                    <p>A: Missing the deadline results in an immediate £100 penalty, with additional charges for further delays. Visit the <a href="https://www.gov.uk/self-assessment-tax-returns/penalties">HMRC late filing penalties page</a> for more details.</p>

                    <h4>Q: Can I claim tax relief?</h4>
                    <p>A: Yes, you can claim tax relief on certain expenses, like work uniforms or professional subscriptions. For more on tax relief, see the <a href="https://www.gov.uk/tax-relief-for-employees">HMRC tax relief page</a>.</p>
                </section>

                <p>Understanding UK taxes can be daunting, but staying informed of the latest rates, thresholds, and deadlines can help you manage your tax responsibilities effectively. Always consult the official HMRC website or a professional advisor for the most current and personalized advice.</p>

                <p>For any further questions, visit the <a href="https://www.gov.uk/contact-hmrc">HMRC contact page</a> to get in touch with HM Revenue and Customs directly.</p>
            </section>
        </div>
    );
};

export default TaxInfo;
