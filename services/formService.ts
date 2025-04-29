const baseUrl = "https://dynamic-form-generator-9rl7.onrender.com";

export const createUser = async (rollNum: string, name: string) => {
  const userData = {
    rollNumber: rollNum,
    name: name,
  };
  const res = await fetch(`${baseUrl}/create-user`, {
    body: JSON.stringify(userData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resStatus = res.status;
  const data = await res.json();
  return { data, resStatus };
};

export const getFormDetails = async (rollNum: string) => {
  const res = await fetch(`${baseUrl}/get-form?rollNumber=${rollNum}`);
  const data = await res.json();
};
