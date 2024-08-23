import PropTypes from "prop-types";

const ProfileSidePanel = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg left-[300px]">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="bg-blue-700 p-4 rounded-t-lg">
          <div className="flex items-center">
            <img
              src={data.profileImage}
              alt={data.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-white text-xl font-bold">{data.name}</h2>
              <p className="text-white">
                @{data.name.toLowerCase().replace(" ", "")}
              </p>
              <p className="text-white">{data.role}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Personal Information</h3>
            <p>
              <strong>Date of Birth:</strong> {data.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong> {data.gender}
            </p>
            <p>
              <strong>Nationality:</strong> {data.nationality}
            </p>
            <p>
              <strong>Contact no.:</strong> {data.contactNo}
            </p>
            <p>
              <strong>E-mail Address:</strong> {data.email}
            </p>
            <p>
              <strong>Work email Address:</strong> {data.email}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Research & Publication</h3>
            <p>
              <strong>{data.research.title}</strong>
              <br />
              Published in the {data.research.publicationName} •{" "}
              {data.research.publicationYear}
              <br />
              {data.research.abstract}
            </p>
            <a href="#" className="text-blue-500">
              See Publication
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileSidePanel.propTypes = {
  data: PropTypes.shape({
    profileImage: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    nationality: PropTypes.string,
    contactNo: PropTypes.string,
    email: PropTypes.string,
    research: PropTypes.shape({
      title: PropTypes.string,
      publicationName: PropTypes.string,
      publicationYear: PropTypes.number,
      abstract: PropTypes.string,
    }),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileSidePanel;
