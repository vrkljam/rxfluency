import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import DrugsAdmin from "./components/DrugsAdmin";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import TermsOfService from "./legal/TermsOfService";
import MedicalDisclaimer from "./legal/MedicalDisclaimer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import PracticeSelection from "./components/PracticeSelection";
import QuizSetup2 from "./components/QuizSetup2";
import QuizNew2 from "./components/QuizNew2";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminRoute from "./routes/AdminRoute";
import Flashcards from "./components/flashcards/Flashcards";
import PTHealthcareQuiz from "./components/pthealthcare/PTHealthcareQuiz";
import PTHealthcareAdmin from "./pages/PTHealthcareAdmin";
import PTHealthcare from "./components/pthealthcare/PTHealthcare";
import PTHealthcareFillInQuiz from "./components/pthealthcare/PTHealthcareFillInQuiz";
import PTHealthcareDrugReference from "./components/pthealthcare/PTHealthcareDrugReference";
import PTDrugFlashcards from "./components/pthealthcare/PTDrugFlashcards";
import PTReference from "./components/pthealthcare/PTReferenceTable";
import MemoryMatrix from "./components/memoryGame/MemoryMatrix";

function App() {
  const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Routes>
        {/* Public Routes (no layout) */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected / Authenticated Routes */}
        <Route path="/" element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Legal / Public pages under layout */}
          <Route path="terms" element={<TermsOfService />} />
          <Route path="disclaimer" element={<MedicalDisclaimer />} />

          {/* protected pages */}
          {/* Practice Selection (requires login) */}
          <Route
            path="practice-selection"
            element={
              <ProtectedRoute>
                <PracticeSelection />
              </ProtectedRoute>
            }
          />

          {/* Quiz Setup (requires login) */}
          <Route
            path="quizsetup2"
            element={
              <ProtectedRoute>
                <QuizSetup2 />
              </ProtectedRoute>
            }
          />

          {/* Quiz Run (requires login) */}
          <Route
            path="quiznew2"
            element={
              <ProtectedRoute>
                <QuizNew2 />
              </ProtectedRoute>
            }
          />

          {/* Flashcards (requires login) */}
          <Route
            path="flashcards"
            element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            }
          />

          {/* PT Healthcare Quiz (requires login) */}
          {/* <Route
            path="pthealthcarequiz"
            element={
              <ProtectedRoute>
                <PTHealthcareQuiz />
              </ProtectedRoute>
            }
          /> */}
          {/* PT Healthcare Quiz (requires login) */}
          <Route
            path="pthealthcare/quiz"
            element={
              <ProtectedRoute>
                <PTHealthcareFillInQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pt-drug-reference"
            element={<PTHealthcareDrugReference />}
          />
          <Route path="/pt-flashcards" element={<PTDrugFlashcards />} />
          <Route path="/pt-reference" element={<PTReference />} />

          {/* <Route path="/pthealthcare" element={<PTHealthcare />} /> */}

          {/* Profile (requires login) */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/memory"
            element={
              <ProtectedRoute>
                <MemoryMatrix />
              </ProtectedRoute>
            }
          />

          {/* Admin route (if you want it protected too) */}
          <Route
            path="admin/drugs"
            element={
              <AdminRoute>
                <DrugsAdmin />
              </AdminRoute>
            }
          />
          <Route path="/admin/pt-drugs" element={<PTHealthcareAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
