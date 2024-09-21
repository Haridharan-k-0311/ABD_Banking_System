app.post("/login", async (req, res) => { 
  try {
    const userData = new User(req.body);
    
    // Assuming you want to get the user status from cookies
    const userStatus = req.cookies.userStatus;
    const loginStatus = userStatus? JSON.parse(userStatus): null; 
    console.log(loginStatus);
    const popUpError = `
      <script>
        alert("Already logged in!!");
        window.location.href='http://127.0.0.1:3000/loginPage.html';
      </script>
    `; 
    
    const signUp = `
      <script>
        alert("Sign up!!");
        window.location.href='http://127.0.0.1:3000/loginPage.html';
      </script>
    `;
  
    const popUpStatus = `
      <script>
        alert("Login Successful! Welcome, ${userData. Username}!");
        window.location.href='http://127.0.0.1:3000';
      </script>
    `;

    const existingUser = await User.findOne({
      $or: [{ Username: userData. Username}, {Email: userData.Email}],
    });

    if (existingUser && loginStatus) { 
      return res.send(popUpError); 
    } else if (!existingUser) { 
      return res.send(signUp); 
    }
  
    const userDetails = JSON.stringify({ status: true, email: userData.Email }); 
    res.cookie('userStatus', userDetails, {maxAge: 1800000, httpOnly: true });
  
    res.send(popUpStatus); 
  } catch (error) {
    console.error("Error saving user:", error); 
    res.status(500).send("Internal Server Error"); 
  }
});