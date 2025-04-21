import React from 'react'
import Layout from '../components/Layout/Layout'
import {useAuth} from "../context/auth.jsx"
import "./style.css"

const HomePage = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout>
      {/* <h1>Home page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div>
  <section id="hero">
    <div className="container">
      <h2 span className="text-highlight">Secure Your Valuables with Confidence</h2>
      <p>Your peace of mind is our priority. Safe and secure vaults for your important documents and valuables.</p>
      <a href="#contact" className="cta-button">Get In Touch</a>
    </div>
  </section>
  <section id="brief">
    <div className="container">
      <h2>Why FortressGuard</h2><br />
      <p>A safe deposit locker vault is an essential service for individuals seeking a secure and confidential way to
        protect their valuable possessions. With its advanced security features, protective measures, and privacy
        assurances, it provides an ideal solution for safeguarding important documents, jewelry, and other precious
        items against various risks.</p>
    </div>
  </section>
  <section id="keys">
    <div className="features">
      <h3>High Security:</h3>
      <p>Robust Construction: Safe deposit lockers are housed in vaults constructed with reinforced steel and concrete
        to resist forced entry and withstand various forms of attack.
        Advanced Locking Mechanisms: They feature sophisticated locking systems, including dual-control locks,
        biometric
        scanners, and electronic keypads, to ensure that only authorized individuals can access the locker.
        Surveillance: The vaults are monitored by 24/7 CCTV surveillance systems to deter and detect any unauthorized
        activities.
      </p>
      <h3>Privacy and Confidentiality:</h3>
      <p>Personalized Access: Each safe deposit locker is assigned to a specific customer, and access is granted only
        to
        authorized individuals who possess the correct keys or biometric credentials. <br />
        Discreet Management: The contents of a safe deposit locker are known only to the renter, ensuring complete
        confidentiality.
      </p>
      <h3>Protection Against Risks:</h3>
      <p>Fire and Water Resistance: The vaults are designed to withstand extreme temperatures and water damage,
        offering
        protection against fire, flooding, and other disasters. <br />
        Natural Disaster Resilience: The construction and location of the vault ensure that it remains secure in the
        event of natural calamities, such as earthquakes or hurricanes.</p>
      <h3>Variety of Sizes:</h3>
      <p>Customizable Options: Safe deposit lockers come in various sizes to accommodate different types and
        quantities
        of items, from important documents and jewelry to heirlooms and valuable collectibles.</p>
    </div>
  </section>
  <section id="services">
    <div className="container">
      <h2>Our Services</h2>
      <ul>
        <li>Convenient Timings</li>
        <li>Advanced Security Systems</li>
        <li>Unlimited Access</li>
        <li>Custom Locker Sizes</li>
        <li>Dual-Key System</li>
        <li>Additional Lock Feature</li>
        <li>Biometric Access</li>
        <li>Short Period Locker Available</li>
        <li>FR-Fire Resistant Lockers Available</li>
      </ul>
    </div>
  </section>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Size</th>
        <th scope="col">Type</th>
        <th scope="col">Size</th>
        <th scope="col">Rent per day</th>
        <th scope="col">Rent Annually</th>
        <th scope="col">Intrest free security deposit</th>
        <th scope="col">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Small</th>
        <td>A</td>
        <td>05X07X21</td>
        <td>4.16</td>
        <td>125x12=1500</td>
        <td>7000</td>
        <td>8500</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>B</td>
        <td>06X08X21</td>
        <td>5.00</td>
        <td>150x12=1800</td>
        <td>8000</td>
        <td>9800</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>C</td>
        <td>05X14X21</td>
        <td>06.97</td>
        <td>209x12=2500</td>
        <td>11000</td>
        <td>13500</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>D</td>
        <td>07X11X21</td>
        <td>07.08</td>
        <td>234x12=2800</td>
        <td>15000</td>
        <td>17800</td>
      </tr>
      <tr>
        <th scope="row">Medium</th>
        <td>H1</td>
        <td>13X08X21</td>
        <td>08.69</td>
        <td>260x12=3100</td>
        <td>18000</td>
        <td>21100</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>G</td>
        <td>06X17X21</td>
        <td>10.00</td>
        <td>300x12=3600</td>
        <td>20000</td>
        <td>23600</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>G1</td>
        <td>08X21X21</td>
        <td>11.20</td>
        <td>336x12=4000</td>
        <td>26000</td>
        <td>30000</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>F</td>
        <td>11X14X21</td>
        <td>11.67</td>
        <td>350x12=4200</td>
        <td>30000</td>
        <td>34200</td>
      </tr>
      <tr>
        <th scope="row">Large</th>
        <td>H</td>
        <td>13X17X21</td>
        <td>13.95</td>
        <td>418x12=50X00</td>
        <td>45000</td>
        <td>50000</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>L</td>
        <td>19X21X21</td>
        <td>20.85</td>
        <td>625x12=7500</td>
        <td>60000</td>
        <td>67500</td>
      </tr>
      <tr>
        <th scope="row" />
        <td>FR</td>
        <td>20X18X21</td>
        <td>20.85</td>
        <td>625x12=7500</td>
        <td>60000</td>
        <td>67500</td>
      </tr>
    </tbody>
  </table>
  <div className="idp">
    <h1>APPLICATION REQUIREMENTS</h1>
    <p>All customers are required to produce KYC documents - Identity proof and Address proof at the time of hiring a
      locker. The tabular column below illustrates the documents you will have to produce.</p>
    <p><strong>PAN is mandatory for all Hirers / Operators</strong></p>
    <div className="tabs">
      <div className="tab active">Individuals</div>
      <div className="tab">Trusts</div>
      <div className="tab">Societies / Clubs / Associations</div>
      <div className="tab">Proprietary Concern</div>
      <div className="tab">Partnership Concern</div>
      <div className="tab">HUF</div>
      <div className="tab">Private Ltd / Limited Companies</div>
    </div>
    <div className="content">
      <h2>1. Proof of Identity (Any one)</h2>
      <ul>
        <li>Passport / Voter ID / Driving License / Aadhaar card / Ration card with photo.</li>
      </ul>
      <h2>2. Proof of Address (Any one)</h2>
      <ul>
        <li>Driving License / Passport / Aadhaar card / Voter ID / EB - latest bill with the copy of the card.</li>
        <li>Telephone bill - Post-paid / Landline / Fibernet (EB &amp; Telephone bills should be within the last 3
          months).
        </li>
        <li>Bank Statement (with last 3 months transactions with bank round seal / Passbook with Bank authentication).
        </li>
        <li>Registered Rental Agreement / Property tax receipt with the book copy.</li>
      </ul>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default HomePage
