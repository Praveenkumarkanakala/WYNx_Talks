import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";
import wynxBackground from "../images/wynxbgn.jpg";
import { Box, Container, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";

const stateCityMapping = {
    "Andhra Pradesh": [ "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Nellore", "Mahbubnagar", "Kakinada", "Tirupati", "Nandyal", "Narasaraopet", "Bapatla", "Peddapalli","Suryapet", "Rayachoti", "Chandragiri", "Atmakur", "Macherla", "Palnadu", "Peddapuram",  "Amalapuram", "Punganur", "Ongole", "Proddatur", "Tanuku", "Eluru", "Mangalagiri", "Machilipatnam"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Aalo", "Bomdila", "Seppa", "Namsai", "Changlang", "Khonsa", "Tezu", "Roing", "Lower Dibang Valley", "Upper Subansiri", "Lower Subansiri", "West Kameng", "East Kameng", "Papum Pare", "Longding", "Kurung Kumey",    "Upper Siang", "West Siang", "East Siang", "Dibang Valley", "Lohit", "Anjaw"],
    "Assam": [ "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tezpur", "Tinsukia", "Haflong",  "Barpeta", "Bongaigaon", "Dhemaji", "Golaghat", "Karimganj", "Kokrajhar", "Lakhimpur",    "Morigaon", "Sivasagar", "Sonitpur", "Kamrup", "Chirang", "Baksa", "Darrang", "Udalguri"],
    "Bihar": [ "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Munger", "Begusarai", "Purnia",   "Nalanda", "Buxar", "Siwan", "Saran", "Aurangabad", "Araria", "Khagaria", "Jamui", "Madhepura",  "Lakhisarai", "Sheikhpura", "Kaimur", "Jehanabad", "Nawada", "Supaul", "Banka", "Kishanganj",  "Motihari", "West Champaran", "East Champaran", "Samastipur"],
    "Gujarat": [  "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Anand", "Nadiad", "Gandhinagar", "Junagadh", "Kutch", "Porbandar", "Mehsana", "Navsari", "Dahod", "Banaskantha", "Patan", "Sabarkantha", "Valsad", "Dang", "Mahisagar", "Morbi", "Panchmahal", "Chhota Udepur"],
    "Haryana": [ "Chandigarh", "Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar", "Karnal", "Kurukshetra", "Sonipat", "Bhiwani", "Rohtak", "Sirsa", "Mahendragarh", "Yamunanagar", "Fatehabad", "Jind", "Panchkula", "Rewari", "Nuh", "Palwal" ],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Kangra", "Bilaspur", "Chamba", "Hamirpur", "Una", "Sirmaur", "Kullu", "Spiti", "Lahaul" ],
    "Jharkhand": [ "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Giridih", "Deoghar", "Dumka","Ramgarh", "Palamu", "Simdega", "Khunti", "Pakur", "Sahebganj", "Garhwa", "Chatra", "Kodarma","Latehar", "Saraikela Kharsawan"],
    "Karnataka": [ "Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi", "Ballari", "Shimoga", "Dakshina Kannada", "Tumakuru", "Udupi", "Raichur", "Chitradurga", "Kolar", "Hassan", "Chikmagalur", "Bijapur","Bagalkot", "Gulbarga", "Bidar", "Mandya", "Koppal", "Yadgir", "Chamarajanagar", "Kodagu"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Malappuram",   "Ernakulam", "Idukki", "Wayanad", "Kannur", "Kottayam", "Pathanamthitta", "Alappuzha", "Kasargod"],
    "Tamil Nadu": [ "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode", "Tirupur", "Vellore",  "Chidambaram", "Dindigul", "Kanchipuram", "Karur", "Krishnagiri", "Nilgiris", "Pudukkottai", "Ramanathapuram",  "Thanjavur", "Thoothukudi", "Cuddalore", "Tiruvallur", "Villupuram", "Virudhunagar", "Nagapattinam"],
    "Telangana": [  "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Rangareddy", "Mahabubnagar", "Medak", "Nalgonda", "Adilabad", "Kothagudem", "Suryapet", "Peddapalli", "Jagtial", "Sangareddy", "Kamareddy",  "Wanaparthy", "Jogulamba Gadwal", "Mahabubabad", "Vikarabad"  ],
    "Uttar Pradesh": [ "Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Bareilly", "Ghaziabad", "Moradabad", "Noida", "Meerut", "Gorakhpur", "Firozabad", "Aligarh", "Saharanpur", "Shahjahanpur", "Muzaffarnagar", "Mathura", "Azamgarh", "Jaunpur", "Bijnor", "Raebareli", "Sitapur", "Unnao", "Kanpur Dehat", "Etawah"],
    "Uttarakhand": [ "Dehradun", "Haridwar", "Nainital", "Almora", "Rudraprayag", "Chamoli", "Pauri Garhwal", "Pithoragarh", "Udham Singh Nagar", "Tehri Garhwal", "Bageshwar", "Champawat", "Nanital", "Uttarkashi"],
    "West Bengal": [ "Kolkata", "Siliguri", "Durgapur", "Howrah", "Asansol", "Kharagpur", "Midnapore", "Murshidabad", "Birbhum", "Burdwan", "Nadia", "Cooch Behar", "South 24 Parganas", "North 24 Parganas", "Purulia", "Bankura", "Paschim Medinipur", "Maldah", "Jalpaiguri", "Darjeeling", "Purulia", "Hooghly" ],
    "Delhi": [ "New Delhi", "Dwarka", "Rohini", "Saket", "Vasant Vihar", "Janakpuri", "Shahdara", "Kailash Colony", "Pitampura", "Karol Bagh", "Lajpat Nagar", "Rajouri Garden", "Connaught Place"],
    "Jammu and Kashmir": [  "Srinagar", "Jammu", "Anantnag", "Baramulla", "Kishtwar", "Kathua", "Pulwama", "Kupwara", "Udhampur", "Rajouri", "Poonch", "Doda", "Samba", "Reasi", "Kulgam" ],
    "Ladakh": [ "Leh", "Kargil"],
};

const SponsorRegistration = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", company: "", designation: "", state: "", city: "" });
  const [cities, setCities] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData({ ...formData, state, city: "" });
    setCities(stateCityMapping[state] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://wynxtalks.com/api/send-email", formData);
      alert(data.message);
      setFormData({ name: "", email: "", mobile: "", company: "", designation: "", state: "", city: "" });
    } catch {
      alert("Failed to send email. Try again later.");
    }
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ position: "relative", width: "100%", height: { xs: "40vh", sm: "50vh", md: "60vh" }, backgroundImage: `url(${wynxBackground})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ color: "white", textAlign: "center", p: 2, width: { xs: "90%", md: "600px" } }}>
          <Typography variant="h1" sx={{ color: "white", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem" }, mb: 1 }}>SPONSORSHIP REGISTRATION</Typography>
          <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>Home / Sponsorship Registration</Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ my: 4, p: { xs: 2, sm: 3 } }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth size="small" />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth size="small" />
          <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required fullWidth size="small" />
          <TextField label="Company" name="company" value={formData.company} onChange={handleChange} required fullWidth size="small" />
          <TextField label="Designation" name="designation" value={formData.designation} onChange={handleChange} required fullWidth size="small" />
          <FormControl fullWidth required>
            <InputLabel>State</InputLabel>
            <Select name="state" value={formData.state} onChange={handleStateChange} label="State" size="small">
              <MenuItem value="">Select State</MenuItem>
              {Object.keys(stateCityMapping).map((state) => <MenuItem key={state} value={state}>{state}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>City</InputLabel>
            <Select name="city" value={formData.city} onChange={handleChange} label="City" size="small">
              <MenuItem value="">Select City</MenuItem>
              {cities.map((city) => <MenuItem key={city} value={city}>{city}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#ff007f", fontWeight: "bold", py: 1.5, "&:hover": { bgcolor: "#e00072" } }}>
            Submit
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default SponsorRegistration;