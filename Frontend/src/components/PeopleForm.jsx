import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import PropTypes from "prop-types";
import Modal from "./Modal";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["Active", "Inactive"]),
  teams: z.array(z.string()).min(1, "At least one team is required"),
});

const roleOptions = [
  { value: "Product Designer", label: "Product Designer" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
];

const teamOptions = [
  { value: "Design", label: "Design" },
  { value: "Product", label: "Product" },
  { value: "Marketing", label: "Marketing" },
  { value: "Technology", label: "Technology" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const PeopleForm = ({ defaultValues, onSave, onCancel, isEditing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      teams: Array.isArray(defaultValues.teams) ? defaultValues.teams : [],
      role: defaultValues.role || "",
      status: defaultValues.status || "Active",
    },
  });

  const [profileImage, setProfileImage] = useState(
    defaultValues.profileImage || "/default-avatar.png"
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        console.log("Image Data URL:", result);
        setProfileImage(result);
        setValue("profileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("Current profileImage State:", profileImage);

  return (
    <Modal onClose={onCancel}>
      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        <div className="text-center">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <div className="mt-2">
            <label
              htmlFor="profileImage"
              className="text-blue-600 cursor-pointer"
            >
              {isEditing ? "Change Photo" : "Add Photo"}
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {isEditing && profileImage !== "/default-avatar.png" && (
              <button
                type="button"
                className="text-red-600 ml-4"
                onClick={() => {
                  setProfileImage("/default-avatar.png");
                  setValue("profileImage", "");
                }}
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            {...register("name")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            {...register("email")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <Select
            options={roleOptions}
            name="role"
            onChange={(selectedOption) =>
              setValue("role", selectedOption.value)
            }
            defaultValue={roleOptions.find(
              (option) => option.value === defaultValues.role
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Teams
          </label>
          <Select
            isMulti
            options={teamOptions}
            name="teams"
            onChange={(selectedOptions) =>
              setValue(
                "teams",
                selectedOptions.map((option) => option.value)
              )
            }
            defaultValue={defaultValues.teams.map((team) =>
              teamOptions.find((option) => option.value === team)
            )}
          />
          {errors.teams && (
            <p className="text-red-500 text-sm">{errors.teams.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <Select
            options={statusOptions}
            name="status"
            onChange={(selectedOption) =>
              setValue("status", selectedOption.value)
            }
            defaultValue={statusOptions.find(
              (option) => option.value === defaultValues.status
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-200 p-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

PeopleForm.propTypes = {
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string.isRequired,
    teams: PropTypes.array.isRequired,
    profileImage: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default PeopleForm;
