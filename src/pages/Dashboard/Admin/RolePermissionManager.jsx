import React, { useState, useEffect } from "react";
import Container from "../../../components/Shared/Container";
import axios from "axios";
import baseUrl from "../../../api/baseUrl";

// Example permissions
const permissionsList = [
  { name: "View Properties", key: "viewProperties" },
  { name: "Edit Properties", key: "editProperties" },
  { name: "Delete Properties", key: "deleteProperties" },
  { name: "Manage Users", key: "manageUsers" },
  { name: "View Reports", key: "viewReports" },
];

// Initial role permissions
const initialPermissions = {
  moderator: {},
  // buyer: {},
  // agent: {},
  // developer: {},
};

const RolePermissionManager = () => {
  const [rolePermissions, setRolePermissions] = useState(initialPermissions);
  const [selectedRole, setSelectedRole] = useState("moderator");
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await baseUrl.get("/admins/get-admins");
        if (res?.data?.data && res?.data?.data.length > 0) {
          const validAdmins = res?.data?.data.filter(
            (admin) => admin.blocked === false
          );
          if (validAdmins.length > 0) {
            const firstAdminPermissions = validAdmins[0].permission || {};
            // Set initial permissions based on the first valid admin's permission
            setRolePermissions({
              ...rolePermissions,
              moderator: firstAdminPermissions,
            });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handlePermissionChange = (role, permissionKey) => {
    setRolePermissions((prevPermissions) => {
      const updatedPermissions = {
        ...prevPermissions,
        [role]: {
          ...prevPermissions[role],
          [permissionKey]: !prevPermissions[role][permissionKey],
        },
      };

      permissionsList.forEach((permission) => {
        if (updatedPermissions[role][permission.key] === undefined) {
          updatedPermissions[role][permission.key] = false;
        }
      });

      return updatedPermissions;
    });
  };

  const savePermissions = async (role) => {
    const permissionsData = rolePermissions[role];

    try {
      const res = await baseUrl.post("/admins/permission", {
        admin: {
          permission: permissionsData,
        },
      });

      if (res.data.data) {
        console.log(res);
        window.alert("Permission updated successfully!");
      }
    } catch (error) {
      console.error("Permission update failed:", error);
      window.alert("Permission update failed. Please try again.");
    }
  };

  const handleSaveClick = () => {
    switch (selectedRole) {
      case "moderator":
      case "buyer":
      case "agent":
      case "developer":
        savePermissions(selectedRole);
        break;
      default:
        console.log("Invalid role selected");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10">
      <Container>
        <div className="p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            Role Permission Manager
          </h2>

          {/* Role Selector */}
          <div className="mb-6">
            <label htmlFor="roleSelect" className="block font-semibold mb-2">
              Select Role
            </label>
            <select
              id="roleSelect"
              className="w-full px-2 py-2 border rounded-md"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {Object.keys(initialPermissions).map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions List */}
          <div className="space-y-4">
            {permissionsList.map((permission) => (
              <div key={permission.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${selectedRole}-${permission.key}`}
                  checked={!!rolePermissions[selectedRole][permission.key]}
                  onChange={() =>
                    handlePermissionChange(selectedRole, permission.key)
                  }
                  className="mr-2"
                />
                <label
                  htmlFor={`${selectedRole}-${permission.key}`}
                  className="font-semibold"
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className="mt-4 bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Save Permissions
          </button>
        </div>
      </Container>
    </div>
  );
};

export default RolePermissionManager;
