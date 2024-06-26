const InvalidCredentialLogin = () => {
  return (
    <div className="mb-3 flex w-full flex-col items-center border border-red-600 bg-[#FFEBE8] py-2 text-sm">
      <p>
        <b>Wrong credentials</b>
      </p>
      <p>Invalid username or password</p>
    </div>
  );
};

export default InvalidCredentialLogin;
