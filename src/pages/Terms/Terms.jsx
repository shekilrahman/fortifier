import React from 'react';
import styles from './Terms.module.css';
import logo from '../../assets/FORTIFIER.svg';
import Footer from '../../components/Footer';
import { ReactLenis } from 'lenis/react';

const Terms = () => {
    return (
        <ReactLenis root>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="Fortifier Security Solutions" className={styles.logo} />
                    </div>

                    <h1 className={styles.title}>Terms & Conditions of Trade</h1>

                    <p className={styles.intro}>
                        A larger print version of these terms and conditions is available from Fortifier Security Solutions on request.
                    </p>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>1. Definitions</h2>
                        <p className={styles.text}>
                            1.1 <strong>Fortifier</strong> shall mean <strong>Fortifier Security Solutions (ABN 48 524 324 645)</strong>, its successors and assigns or any person acting on behalf of and with the authority of Fortifier.
                        </p>
                        <p className={styles.text}>
                            1.2 <strong>Client</strong> shall mean the Client (or any person acting on behalf of and with the authority of the Client) as described on any quotation, work authorisation or other form as provided by Fortifier to the Client.
                        </p>
                        <p className={styles.text}>
                            1.3 <strong>Guarantor</strong> means that person (or persons) who agrees to be liable for the debts of the Client on a principal debtor basis.
                        </p>
                        <p className={styles.text}>
                            1.4 <strong>Services</strong> shall mean all services supplied by Fortifier to the Client and includes supply and installation of CCTV/security systems, products, advice and recommendations.
                        </p>
                        <p className={styles.text}>
                            1.5 <strong>Price</strong> shall mean the price payable for the Services as agreed between Fortifier and the Client in accordance with clause 4 of this contract.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>2. Compliance With Law</h2>
                        <p className={styles.text}>
                            2.1 Nothing in these terms is intended to contract out of any applicable provisions of the Australian Consumer Law (ACL) or Fair-Trading Acts, except to the extent permitted by those Acts.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>3. Acceptance</h2>
                        <p className={styles.text}>
                            3.1 Any instructions received by Fortifier from the Client for the supply of Services, or the Client’s acceptance of Services supplied by Fortifier, shall constitute acceptance of these terms and conditions.
                        </p>
                        <p className={styles.text}>
                            3.2 Where more than one Client has entered into this agreement, the Clients shall be jointly and severally liable for all payments of the Price.
                        </p>
                        <p className={styles.text}>
                            3.3 These terms and conditions can only be amended with the written consent of Fortifier.
                        </p>
                        <p className={styles.text}>
                            3.4 The Client shall give Fortifier at least fourteen (14) days written notice of any proposed change of ownership or details.
                        </p>
                        <p className={styles.text}>
                            3.5 Services are supplied by Fortifier only on these terms and conditions, to the exclusion of anything in the Client’s order that purports to override them.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>4. Price and Payment</h2>
                        <p className={styles.text}>
                            4.1 At Fortifier’s sole discretion the Price shall be either:<br />
                            (a) as indicated on invoices provided by Fortifier; or<br />
                            (b) as quoted by Fortifier (subject to clause 4.2) provided the Client accepts the quotation in writing within thirty (30) days.
                        </p>
                        <p className={styles.text}>
                            4.2 Fortifier reserves the right to change the Price in the event of a variation to the quotation (including extra materials, travel, labour or site conditions). Variations will be charged accordingly.
                        </p>
                        <p className={styles.text}>
                            4.3 Progress payment claims may be issued in accordance with Fortifier’s payment schedule.
                        </p>
                        <p className={styles.text}>
                            4.4 Payment is due on completion of the Services unless otherwise agreed in writing.
                        </p>
                        <p className={styles.text}>
                            4.5 If no time is stated then payment shall be due thirty (30) days from the date of invoice.
                        </p>
                        <p className={styles.text}>
                            4.6 Payment methods: cash, bank transfer, credit card (may incur a surcharge), or any other agreed method.
                        </p>
                        <p className={styles.text}>
                            4.7 GST and other taxes will be added to the Price where applicable.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>5. Delivery and Installation</h2>
                        <p className={styles.text}>
                            5.1 Delivery/installation shall take place when:<br />
                            (a) the Client takes possession of the goods at Fortifier’s premises; or<br />
                            (b) the Client takes possession of the goods at the Client’s site.
                        </p>
                        <p className={styles.text}>
                            5.2 Delivery/installation costs may be:<br />
                            (a) included in the Price; or<br />
                            (b) in addition to the Price; or<br />
                            (c) charged separately.
                        </p>
                        <p className={styles.text}>
                            5.3 Delivery to a third party nominated by the Client is deemed delivery to the Client.
                        </p>
                        <p className={styles.text}>
                            5.4 Fortifier may deliver the Services in separate instalments.
                        </p>
                        <p className={styles.text}>
                            5.5 Fortifier shall not be liable for any loss due to delayed installation beyond its control.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>6. Risk</h2>
                        <p className={styles.text}>
                            6.1 All risk for the goods passes to the Client on delivery/installation.
                        </p>
                        <p className={styles.text}>
                            6.2 Installation may require ladders, drilling, or restricted access to certain areas. Fortifier is not responsible for pre‑existing structural issues.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>7. Title</h2>
                        <p className={styles.text}>
                            7.1 Ownership of goods does not pass until:<br />
                            (a) the Client has paid Fortifier all amounts owing; and<br />
                            (b) the Client has met all other obligations due by the Client to Fortifier.
                        </p>
                        <p className={styles.text}>
                            7.2 Until then, Fortifier may recover and repossess any unpaid goods.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>8. Inspection and Claims</h2>
                        <p className={styles.text}>
                            8.1 The Client shall inspect the Services on completion and notify Fortifier within seven (7) days of any defect, shortage, or error.
                        </p>
                        <p className={styles.text}>
                            8.2 If the Client fails to notify Fortifier within this period, the Services shall be deemed accepted.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>9. Default</h2>
                        <p className={styles.text}>
                            9.1 Interest on overdue invoices shall accrue daily at a rate of 2.5% per month, compounding monthly.
                        </p>
                        <p className={styles.text}>
                            9.2 The Client shall be liable for any dishonour fees, legal costs, and collection costs incurred by Fortifier.
                        </p>
                        <p className={styles.text}>
                            9.3 Fortifier may suspend or terminate Services if the Client is in default.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>10. Security & Charge</h2>
                        <p className={styles.text}>
                            10.1 The Client and/or Guarantor agree to charge all their interest in land or other assets to Fortifier to secure any obligations under this agreement.
                        </p>
                        <p className={styles.text}>
                            10.2 Fortifier may lodge a caveat or register a security interest (PPSR) until obligations are satisfied.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>11. Cancellation</h2>
                        <p className={styles.text}>
                            11.1 Fortifier may cancel a contract or delivery of Services before commencement by giving written notice.
                        </p>
                        <p className={styles.text}>
                            11.2 The Client may cancel but will be liable for any costs incurred by Fortifier up to the time of cancellation.
                        </p>
                        <p className={styles.text}>
                            11.3 If the Client cancels after paying an advance/deposit, Fortifier will retain ten percent (10%) of the total quoted Price as an administrative and processing fee. This retention covers booking allocation, scheduling, administration, payment processing, and other associated costs.
                        </p>
                        <p className={styles.text}>
                            11.4 Any remaining balance of the Client’s advance (after applying the 10% retention and any costs under clause 11.2) will be refunded to the Client.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>12. Liability</h2>
                        <p className={styles.text}>
                            12.1 Fortifier shall not be liable for any indirect, special, incidental, exemplary, or consequential loss (including but not limited to loss of profit, loss of revenue, loss of business opportunity, loss of data, loss of recordings, or downtime) arising out of these terms or the performance of the Services.
                        </p>
                        <p className={styles.text}>
                            12.2 The Client agrees that, to the maximum extent permitted by law, Fortifier’s total aggregate liability for any claim, damage, loss, or breach is strictly limited to rectification of the defective Services only, and does not include refunds, compensation, or reimbursement of any kind.
                        </p>
                        <p className={styles.text}>
                            12.3 Fortifier’s liability is limited to correcting the workmanship-related issue. If rectification is not reasonably possible, Fortifier may, at its sole discretion, provide an equivalent remedial solution.
                        </p>
                        <p className={styles.text}>
                            12.4 Under no circumstances shall Fortifier be liable for:<br />
                            (a) downtime, interruption of service, or system outages.<br />
                            (b) loss of CCTV footage, recordings, or data, whether caused by equipment failure, network issues, storage failure, misuse, or third-party cloud systems.<br />
                            (c) delays or failures caused by the Client’s network, Wi-Fi, NBN, ISP, router, modem, or power issues.<br />
                            (d) compatibility problems caused by third-party devices, updates, or software changes outside Fortifier’s control.
                        </p>
                        <p className={styles.text}>
                            12.5 Where the Australian Consumer Law (ACL) applies, Fortifier’s liability is limited to the minimum extent permitted under ACL, and nothing in this clause excludes rights that cannot lawfully be excluded.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>13. Privacy</h2>
                        <p className={styles.text}>
                            13.1 The Client authorises Fortifier to obtain and exchange credit information as required for the purposes of assessing creditworthiness, processing payments, and collecting outstanding accounts.
                        </p>
                        <p className={styles.text}>
                            13.2 Personal information may be used for marketing Fortifier’s Services unless the Client opts out in writing.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>14. General</h2>
                        <p className={styles.text}>
                            14.1 If any clause is invalid or unenforceable, the remaining clauses remain in force.
                        </p>
                        <p className={styles.text}>
                            14.2 These terms are governed by the laws of Queensland, Australia.
                        </p>
                        <p className={styles.text}>
                            14.3 Fortifier may license or subcontract its obligations without the Client’s consent.
                        </p>
                        <p className={styles.text}>
                            14.4 Fortifier may update these terms and will notify the Client in writing of any changes.
                        </p>
                        <p className={styles.text}>
                            14.5 Neither party shall be liable for delays caused by events beyond reasonable control (e.g. acts of God, strikes, etc.).
                        </p>
                        <p className={styles.text}>
                            14.6 Fortifier’s failure to enforce any provision shall not be deemed a waiver.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>15. Warranty & Workmanship Warranty</h2>
                        <p className={styles.text}>
                            <strong>15.1 Lifetime Workmanship Guarantee</strong><br />
                            Fortifier Security Solutions guarantees the quality of its installation workmanship for the lifetime of the installed system at the original installation address. The Lifetime Workmanship Guarantee covers installation workmanship defects and loose fittings or misalignment caused by installation. The Lifetime Workmanship Guarantee does not cover equipment failure (which is covered under manufacturer warranty), client-caused damage, network, Wi-Fi, NBN or internet-related issues, alterations or interference by third parties, or environmental, structural, or electrical issues not caused by workmanship. A flat call-out fee of $100 may be charged for callouts under the Lifetime Workmanship Guarantee after twelve (12) months, and a call-out fee also applies within the first twelve (12) months if no workmanship fault is found.
                        </p>
                        <p className={styles.text}>
                            <strong>15.2 Manufacturer Warranty</strong><br />
                            All products supplied by Fortifier are covered by the original manufacturer warranty, with warranty periods varying depending on the product brand and model. Manufacturer warranty covers hardware defects, factory faults, and unit malfunction not caused by external factors. Manufacturer warranty does not cover water damage, insect or vermin damage, power surge or unstable voltage, client-supplied equipment, or firmware or software changes outside manufacturer control. Fortifier will assist with warranty claim submissions but is not responsible for manufacturer decisions, processing timeframes, or replacement stock availability.
                        </p>
                        <p className={styles.text}>
                            <strong>15.3 Warranty Service Conditions</strong><br />
                            To lodge a warranty claim, the Client must provide proof of purchase, a description of the fault, and access to the installation site. If the issue is not covered by warranty, standard call-out and labour charges apply. If equipment is confirmed faulty under manufacturer warranty, Fortifier will install the replacement unit at no labour cost within the first twelve (12) months, after which labour charges may apply.
                        </p>
                        <p className={styles.text}>
                            <strong>15.4 Exclusions (Not Covered Under Any Warranty)</strong><br />
                            The following are excluded from all warranties: misuse, negligence, or unauthorised modifications; Wi-Fi, NBN, ISP, router, modem, or network-related issues; footage loss, downtime, or recording interruptions; environmental damage including rust, moisture, weathering, or insects; renovation or construction-related damage; client-supplied equipment; and software, app, or cloud-service changes outside Fortifier’s control.
                        </p>
                        <p className={styles.text}>
                            <strong>15.5 Warranty Transferability</strong><br />
                            All warranty coverage applies only to the original installation address and is not transferable if the Client relocates or sells the property.
                        </p>
                        <p className={styles.text}>
                            <strong>15.6 Extended Warranty Option (Optional Add-On)</strong><br />
                            Fortifier offers an optional Extended Equipment Warranty for $100, providing an additional two (2) years of manufacturer-equivalent coverage. The Extended Warranty covers hardware failures, manufacturer defects, and faulty unit replacement, with labour included if the failure occurs within the first twelve (12) months. The Extended Warranty does not cover client-supplied equipment, network, Wi-Fi, ISP, or NBN issues, environmental damage such as moisture, rust, insects, or weathering, power surges or electrical faults, data or footage loss, or misuse, neglect, or third-party alterations. The Extended Warranty must be purchased at the time of installation or within thirty (30) days of installation.
                        </p>
                        <p className={styles.text}>
                            <strong>15.7 Inconsistency</strong><br />
                            In the event of any inconsistency between this clause and any warranty information provided verbally, this clause shall prevail.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>16. Client-Supplied Equipment</h2>
                        <p className={styles.text}>
                            16.1 Fortifier accepts no liability for the performance, reliability, compatibility, or warranty status of any equipment supplied by the Client.
                        </p>
                        <p className={styles.text}>
                            16.2 Installation of Client-supplied equipment is performed on a best-effort basis, and Fortifier is not responsible for faults, failures, or additional labour required due to such equipment.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>17. Network & Wi-Fi Conditions</h2>
                        <p className={styles.text}>
                            17.1 CCTV, smart devices, and other integrated systems require a stable network/Wi-Fi environment. Fortifier is not responsible for performance issues caused by the Client’s network, internet provider, router, or Wi-Fi limitations.
                        </p>
                        <p className={styles.text}>
                            17.2 Any additional work required due to network issues will be treated as a billable variation.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>18. Site Safety, Structural Conditions & Client Liability</h2>
                        <p className={styles.text}>
                            18.1 The Client must ensure Fortifier has safe, compliant, and unobstructed access to all installation areas, including ceilings, roof spaces, roof exterior, wall cavities, ladders, and any elevated or restricted-access zones.
                        </p>
                        <p className={styles.text}>
                            18.2 The Client acknowledges that installation work often involves accessing areas that may contain hidden, aged, weak, or unstable structural components. Fortifier cannot identify all such risks prior to commencing work.
                        </p>
                        <p className={styles.text}>
                            18.3 Fortifier will exercise reasonable care; however, the Client accepts full responsibility and liability for any incidental, accidental, or consequential damage arising from:<br />
                            (a) weak, brittle, aged, or deteriorated ceilings, plaster, timber, roof tiles, battens, or structures.<br />
                            (b) structural failures, hidden defects, or unsafe construction not visible at the time of installation.<br />
                            (c) movement, cracking, or collapse caused by accessing or working within ceiling/roof spaces.<br />
                            (d) vermin damage, water ingress, rot, mould, or other pre-existing conditions.<br />
                            (e) inadequate access or unsafe site conditions.<br />
                            (f) electrical, plumbing, or other concealed services not disclosed by the Client.
                        </p>
                        <p className={styles.text}>
                            18.4 Fortifier shall not be liable for any repair costs, including but not limited to ceiling patching, repainting, roof tile replacement, structural repairs, or any secondary damage caused by accessing structurally compromised or concealed areas.
                        </p>
                        <p className={styles.text}>
                            18.5 If Fortifier determines that conditions are unsafe or structurally unsound, work may be halted until the Client arranges rectification at their own cost.
                        </p>
                        <p className={styles.text}>
                            18.6 The Client agrees to indemnify and hold Fortifier harmless against all claims, losses, costs, or damages arising from structural weaknesses or unsafe site conditions encountered during installation.
                        </p>
                        <p className={styles.text}>
                            18.7 Notwithstanding the above, if any accident or property damage occurs as a direct result of proven negligence by a Fortifier worker, Fortifier’s public liability insurance will cover the reasonable repair, restoration, or remediation costs associated with that incident. Any delays arising from insurance assessment, investigation, or approval processes are outside Fortifier’s control, and Fortifier shall not be liable for consequential delays, scheduling impacts, or Client losses resulting from such processes.
                        </p>
                    </div>

                    <div className={styles.footerNote}>
                        Acceptance of Terms & Conditions<br />
                        <span style={{ fontSize: '0.9rem', fontWeight: 400, textTransform: 'none' }}>By Accepting the quotes, the Client acknowledges that they have read, understood, and agree to be bound by the Fortifier Security Solutions Terms & Conditions of Trade.</span>
                    </div>
                </div>
            </div>
            <Footer />
        </ReactLenis>
    );
};

export default Terms;
