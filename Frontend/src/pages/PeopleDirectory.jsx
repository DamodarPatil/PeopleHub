import { faker } from "@faker-js/faker";
import { useState } from "react";
import PeopleTable from "../components/PeopleTable";
import ProfileSidePanel from "../components/ProfileSidePanel";
import PeopleForm from "../components/PeopleForm";

const generateData = () => {
  return Array(100)
    .fill()
    .map(() => {
      const fullName = faker.person.fullName();
      const [firstName] = fullName.split(" "); 
      const email = `${firstName.toLowerCase()}@untitledui.com`; 
      const researchTitle = faker.lorem.words(5); 
      const publicationYear = faker.date.past({ years: 5 }).getFullYear(); 
      const publicationName = faker.company.name(); 
      const publicationAbstract = faker.lorem.sentences(3); 
      return {
        dateOfBirth: faker.date.past({ years: 30 }).toLocaleDateString(), 
        gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
        nationality: faker.location.country(),
        contactNo: faker.phone.number(),
        profileImage: faker.image.avatar(),
        name: fullName,
        status: "Active",
        role: faker.helpers.arrayElement([
          "Product Designer",
          "Product Manager",
          "Frontend Developer",
          "Backend Developer",
          "UX Designer",
          "UX Copywriter",
          "QA Engineer",
        ]),
        email,
        teams: [
          faker.helpers.arrayElement([
            "Design",
            "Product",
            "Marketing",
            "Technology",
          ]),
        ],
        research: {
          title: researchTitle,
          publicationName,
          publicationYear,
          abstract: publicationAbstract,
        },
      };
    });
};

const PeopleDirectory = () => {
  const [data, setData] = useState(generateData());
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleDelete = (rowIndex) => {
    setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };

  const handleSave = (newData) => {
    if (isAdding) {
      const completeData = {
        ...newData,
        dateOfBirth: faker.date.past({ years: 30 }).toLocaleDateString(),
        gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
        nationality: faker.location.country(),
        contactNo: faker.phone.number(),
        research: {
          title: faker.lorem.words(5),
          publicationName: faker.company.name(),
          publicationYear: faker.date.past({ years: 5 }).getFullYear(),
          abstract: faker.lorem.sentences(3),
        },
      };
      setData((prevData) => [...prevData, completeData]);
    } else {
      setData((prevData) =>
        prevData.map((row) =>
          row.email === newData.email ? { ...row, ...newData } : row
        )
      );
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleClosePanel = () => {
    setSelectedRow(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="relative">
      <div className="flex-1">
        <PeopleTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          onAdd={() => {
            setSelectedRow(null);
            setIsAdding(true);
          }}
        />
      </div>
      {selectedRow && (
        <ProfileSidePanel data={selectedRow} onClose={handleClosePanel} />
      )}
      {(isEditing || isAdding) && (
        <PeopleForm
          defaultValues={
            selectedRow || {
              name: "",
              email: "",
              role: "",
              status: "Active",
              teams: [], 
            }
          }
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default PeopleDirectory;
