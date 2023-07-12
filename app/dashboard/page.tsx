"use client";

const page = () => {
  return (
    <div>
      <div>{localStorage.getItem("username")}</div>
      <button
        onClick={() => {
          try {
            alert("You have been log out");
            localStorage.removeItem("token");
            window.location.href = "/login";
          } catch (error) {
            alert("error");
          }
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default page;
