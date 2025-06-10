import toast from "react-hot-toast";

function handleApiError(error) {
  const status = error.response?.status || error.status;
  const serverMsg =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong";

  if (status && serverMsg && status < 500) {
    toast.error(serverMsg);
    return serverMsg;
  } else {
    toast.error("Something went wrong");
    return "Something went wrong";
  }
}

export { handleApiError };
