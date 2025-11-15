// Script to create admin user in the database
// Run with: node scripts/create-admin-user.js

const { auth } = require('../src/lib/auth');

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Create admin user with the specified credentials
    const result = await auth.api.signUp.email({
      email: "admin@kingpowersystem.in",
      password: "KingPower@123",
      name: "Admin"
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@kingpowersystem.in");
    console.log("Password: KingPower@123");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
    
    // If user already exists, inform the user
    if (error.message && (error.message.includes('exists') || error.message.includes('duplicate'))) {
      console.log('Admin user may already exist.');
    }
  }
}

// Run the function
createAdminUser();