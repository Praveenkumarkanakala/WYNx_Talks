import React, { useState } from "react";
import "./sponsor.css";
import Footer from "../footer/footer";
import Navbar from "../Navbar/navbar";
import axios from "axios";

const BackgroundWithForm = () => {
  const stateCityMapping = {
    "Andhra Pradesh": [ "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Nellore", "Mahbubnagar", "Kakinada", "Tirupati", "Nandyal", "Narasaraopet", "Bapatla", "Peddapalli","Suryapet", "Rayachoti", "Chandragiri", "Atmakur", "Macherla", "Palnadu", "Peddapuram",  "Amalapuram", "Punganur", "Ongole", "Proddatur", "Tanuku", "Eluru", "Mangalagiri", "Machilipatnam"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Aalo", "Bomdila", "Seppa", "Namsai", "Changlang", "Khonsa", "Tezu", "Roing", "Lower Dibang Valley", "Upper Subansiri", "Lower Subansiri", "West Kameng", "East Kameng", "Papum Pare", "Longding", "Kurung Kumey",    "Upper Siang", "West Siang", "East Siang", "Dibang Valley", "Lohit", "Anjaw"],
    "Assam": [ "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tezpur", "Tinsukia", "Haflong",  "Barpeta", "Bongaigaon", "Dhemaji", "Golaghat", "Karimganj", "Kokrajhar", "Lakhimpur",    "Morigaon", "Sivasagar", "Sonitpur", "Kamrup", "Chirang", "Baksa", "Darrang", "Udalguri"],
    "Bihar": [ "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Munger", "Begusarai", "Purnia",   "Nalanda", "Buxar", "Siwan", "Saran", "Aurangabad", "Araria", "Khagaria", "Jamui", "Madhepura",  "Lakhisarai", "Sheikhpura", "Kaimur", "Jehanabad", "Nawada", "Supaul", "Banka", "Kishanganj",  "Motihari", "West Champaran", "East Champaran", "Samastipur"],
    "Chhattisgarh": [ "Raipur", "Bhilai", "Korba", "Bilaspur", "Durg", "Rajnandgaon", "Raigarh", "Surguja", "Jagdalpur",  "Janjgir-Champa", "Jashpur", "Koriya", "Mahasamund", "Baloda Bazar", "Bemetara", "Balrampur",  "Kabirdham", "Mungeli", "Dantewada", "Gariaband", "Surajpur", "Sukma", "Kanker", "Bijapur"],
    "Goa": [ "Panaji", "Margao", "Mapusa", "Vasco da Gama", "Ponda", "Quepem", "Sanguem", "Canacona"],
    "Gujarat": [  "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Anand", "Nadiad", "Gandhinagar", "Junagadh", "Kutch", "Porbandar", "Mehsana", "Navsari", "Dahod", "Banaskantha", "Patan", "Sabarkantha", "Valsad", "Dang", "Mahisagar", "Morbi", "Panchmahal", "Chhota Udepur"],
    "Haryana": [ "Chandigarh", "Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar", "Karnal", "Kurukshetra", "Sonipat", "Bhiwani", "Rohtak", "Sirsa", "Mahendragarh", "Yamunanagar", "Fatehabad", "Jind", "Panchkula", "Rewari", "Nuh", "Palwal" ],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Kangra", "Bilaspur", "Chamba", "Hamirpur", "Una", "Sirmaur", "Kullu", "Spiti", "Lahaul" ],
    "Jharkhand": [ "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Giridih", "Deoghar", "Dumka","Ramgarh", "Palamu", "Simdega", "Khunti", "Pakur", "Sahebganj", "Garhwa", "Chatra", "Kodarma","Latehar", "Saraikela Kharsawan"],
    "Karnataka": [ "Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi", "Ballari", "Shimoga", "Dakshina Kannada", "Tumakuru", "Udupi", "Raichur", "Chitradurga", "Kolar", "Hassan", "Chikmagalur", "Bijapur","Bagalkot", "Gulbarga", "Bidar", "Mandya", "Koppal", "Yadgir", "Chamarajanagar", "Kodagu"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Malappuram",   "Ernakulam", "Idukki", "Wayanad", "Kannur", "Kottayam", "Pathanamthitta", "Alappuzha", "Kasargod"],
    "Madhya Pradesh": [ "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Ratlam", "Katni", "Rewa", "Khandwa", "Burhanpur", "Sehore", "Vidisha", "Chhindwara", "Mandsaur", "Shivpuri", "Tikamgarh","Dewas", "Betul", "Hoshangabad", "Narsinghpur", "Rajgarh", "Damoh", "Shahdol", "Satna"],
    "Maharashtra": [ "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Kolhapur", "Solapur", "Satara", "Amravati", "Akola", "Chandrapur", "Latur", "Nanded", "Yavatmal", "Parbhani", "Buldhana","Washim", "Hingoli", "Sindhudurg", "Raigad", "Ratnagiri", "Palghar", "Bhandara", "Gondia"],
    "Manipur": [ "Imphal", "Bishnupur", "Churachandpur", "Thoubal", "Senapati", "Ukhrul", "Tamenglong", "Chandel" ],
    "Meghalaya": [   "Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara", "Resubelpara"],
    "Mizoram": [ "Aizawl", "Lunglei", "Serchhip", "Champhai", "Kolasib", "Mamit", "Hnahthial", "Saiha", "Lawngtlai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon", "Tuensang", "Zunheboto", "Phek", "Kiphire"],
    "Odisha": [ "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Balasore", "Bargarh", "Jajpur", "Kendrapara", "Jagatsinghpur", "Angul", "Dhenkanal", "Khordha", "Kalahandi", "Nayagarh", "Mayurbhanj"],
    "Punjab": [ "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Fatehgarh Sahib", "Moga", "Hoshiarpur", "Gurdaspur", "Rupnagar", "Sangrur", "Barnala", "Faridkot", "Muktsar", "Kapurthala" ],
    "Rajasthan": [  "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar",  "Pali", "Churu", "Jhalawar", "Dungarpur", "Barmer", "Banswara", "Jaisalmer", "Tonk", "Rajsamand", "Bundi", "Sawai Madhopur", "Chittorgarh", "Nagaur", "Jhunjhunu", "Sri Ganganagar", "Hanumangarh",  "Bhilwara", "Dholpur", "Jalore" ],
    "Sikkim": [ "Gangtok", "Namchi", "Mangan", "Pakyong", "Rangpo"],
    "Tamil Nadu": [ "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode", "Tirupur", "Vellore",  "Chidambaram", "Dindigul", "Kanchipuram", "Karur", "Krishnagiri", "Nilgiris", "Pudukkottai", "Ramanathapuram",  "Thanjavur", "Thoothukudi", "Cuddalore", "Tiruvallur", "Villupuram", "Virudhunagar", "Nagapattinam"],
    "Telangana": [  "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Rangareddy", "Mahabubnagar", "Medak", "Nalgonda", "Adilabad", "Kothagudem", "Suryapet", "Peddapalli", "Jagtial", "Sangareddy", "Kamareddy",  "Wanaparthy", "Jogulamba Gadwal", "Mahabubabad", "Vikarabad"  ],
    "Tripura": [ "Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa", "Belonia", "Sepahijala", "Khowai",  "Maharani", "Mungiakami"],
    "Uttar Pradesh": [ "Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Bareilly", "Ghaziabad", "Moradabad", "Noida", "Meerut", "Gorakhpur", "Firozabad", "Aligarh", "Saharanpur", "Shahjahanpur", "Muzaffarnagar", "Mathura", "Azamgarh", "Jaunpur", "Bijnor", "Raebareli", "Sitapur", "Unnao", "Kanpur Dehat", "Etawah"],
    "Uttarakhand": [ "Dehradun", "Haridwar", "Nainital", "Almora", "Rudraprayag", "Chamoli", "Pauri Garhwal", "Pithoragarh", "Udham Singh Nagar", "Tehri Garhwal", "Bageshwar", "Champawat", "Nanital", "Uttarkashi"],
    "West Bengal": [ "Kolkata", "Siliguri", "Durgapur", "Howrah", "Asansol", "Kharagpur", "Midnapore", "Murshidabad", "Birbhum", "Burdwan", "Nadia", "Cooch Behar", "South 24 Parganas", "North 24 Parganas", "Purulia", "Bankura", "Paschim Medinipur", "Maldah", "Jalpaiguri", "Darjeeling", "Purulia", "Hooghly" ],
    "Delhi": [ "New Delhi", "Dwarka", "Rohini", "Saket", "Vasant Vihar", "Janakpuri", "Shahdara", "Kailash Colony", "Pitampura", "Karol Bagh", "Lajpat Nagar", "Rajouri Garden", "Connaught Place"],
    "Jammu and Kashmir": [  "Srinagar", "Jammu", "Anantnag", "Baramulla", "Kishtwar", "Kathua", "Pulwama", "Kupwara", "Udhampur", "Rajouri", "Poonch", "Doda", "Samba", "Reasi", "Kulgam" ],
    "Ladakh": [ "Leh", "Kargil"],
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    designation: "",
    state: "",
    city: "",
  });

  const [cities, setCities] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle State Change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });
    setCities(stateCityMapping[selectedState] || []);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/send-email", formData);
      alert(response.data.message);
      setFormData({ name: "", email: "", mobile: "", company: "", designation: "", state: "", city: "" });
    } catch (error) {
      alert("Failed to send email. Try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="spbackground-container">
        <div className="spoverlay-text">
          <h1>SPONSORSHIP REGISTRATION</h1>
          <p>Home / Sponsorship Registration</p>
        </div>
      </div>

      <div className="spform-wrapper">
        <form className="spform-container" onSubmit={handleSubmit}>
          <div className="spform-row">
            <label>Name *:</label>
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="spform-row">
            <label>Email *:</label>
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="spform-row">
            <label>Mobile *:</label>
            <input type="text" name="mobile" placeholder="Enter Mobile" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className="spform-row">
            <label>Company *:</label>
            <input type="text" name="company" placeholder="Enter Company Name" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="spform-row">
            <label>Designation *:</label>
            <input type="text" name="designation" placeholder="Enter Designation" value={formData.designation} onChange={handleChange} required />
          </div>
          <div className="spform-row">
            <label>State *:</label>
            <select name="state" value={formData.state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {Object.keys(stateCityMapping).map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="spform-row">
            <label>City *:</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BackgroundWithForm;
