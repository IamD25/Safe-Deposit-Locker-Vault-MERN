import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const LockerManagement = () => {
  const [lockers, setLockers] = useState([]);
  const [formData, setFormData] = useState({
    lockerSize: "",
    lockerPrice: "",
    availableLockers: "",
    assignedLockers: "",
    maintenanceLockers: "",
    totalLockers: ""
  });
  const [editingLocker, setEditingLocker] = useState(null);

  useEffect(() => {
    fetchLockers();
  }, []);

  const fetchLockers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/locker/locker-details`);
      setLockers(res.data.locker);
    } catch (error) {
      console.error("Error fetching lockers", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLocker) {
        await axios.put(`/api/lockers/${editingLocker._id}`, formData);
      } else {
        await axios.post("/api/lockers", formData);
      }
      fetchLockers();
      setFormData({
        lockerSize: "",
        lockerPrice: "",
        availableLockers: "",
        assignedLockers: "",
        maintenanceLockers: "",
        totalLockers: ""
      });
      setEditingLocker(null);
    } catch (error) {
      console.error("Error saving locker", error);
    }
  };

  const handleEdit = (locker) => {
    setEditingLocker(locker);
    setFormData(locker);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/lockers/${id}`);
      fetchLockers();
    } catch (error) {
      console.error("Error deleting locker", error);
    }
  };

  return (
    <div>
      <h2>Locker Management</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key.replace(/([A-Z])/g, " $1").trim()}
            required
          />
        ))}
        <button type="submit">{editingLocker ? "Update" : "Add"} Locker</button>
      </form>
      <ul>
        {lockers.map((locker) => (
          <li key={locker._id}>
            {locker.lockerSize} - {locker.lockerPrice} - {locker.availableLockers}
            <button onClick={() => handleEdit(locker)}>Edit</button>
            <button onClick={() => handleDelete(locker._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LockerManagement;
