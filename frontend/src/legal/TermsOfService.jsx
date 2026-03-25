import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // fallback
    }
  };

  return (
    <div className="landing">
      <div className="landing-overlay">
        <h1 className="landing-title">Terms of Service</h1>

        <div className="landing-blurb no-pulse">
          <div className="landing-blurb-inner">
            <p>
              Welcome to <strong>RxFluency</strong>. By using this website and
              our services, you agree to the following terms:
            </p>
            <ul>
              <li>
                <strong>Use of the Service:</strong> RxFluency provides
                educational quizzes and flashcards to help users learn brand and
                generic medications. The service is for{" "}
                <strong>personal, educational purposes only</strong>.
              </li>
              <li>
                <strong>Account Responsibility:</strong> Users are responsible
                for maintaining the confidentiality of their account
                credentials.
              </li>
              <li>
                <strong>User Conduct:</strong> You agree not to misuse the
                service or attempt to access unauthorized parts of the system.
              </li>
              <li>
                <strong>Intellectual Property:</strong> All content is the
                property of RxFluency or its licensors. Do not copy or
                redistribute without permission.
              </li>
              <li>
                <strong>Limitation of Liability:</strong> RxFluency is provided
                “as is.” Use the service at your own risk.
              </li>
              <li>
                <strong>Changes to Terms:</strong> Continued use constitutes
                acceptance of any changes.
              </li>
            </ul>

            <button className="btn btn-primary" onClick={handleBack}>
              &larr; Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
