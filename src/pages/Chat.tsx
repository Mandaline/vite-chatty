import CustomChat from '../components/CustomChat'
import axios from 'axios'


const fetchAPI = async (messageText: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/chat", {
      message: messageText  // Send the user message in the request body
    });
    
    return response.data;  // Return the response data
  } catch (error) {
    console.error("Error fetching API:", error);
    return "Error fetching response";  // Return an error message
  }
}

const Chat = () => {
  return (
    <div className="page-wrap">
      <CustomChat fetchAPI={fetchAPI} />
    </div>
  )
}

export default Chat