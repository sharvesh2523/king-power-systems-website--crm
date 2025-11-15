import { auth } from "@/lib/auth";

async function createAdminUser() {
  try {
    // Create admin user with the specified credentials
    const adminUser = await auth.api.signUp.email({
      email: "admin@kingpowersystem.in",
      password: "KingPower@123",
      name: "Admin"
    });

    console.log("Admin user created successfully:", adminUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Run the function
createAdminUser();