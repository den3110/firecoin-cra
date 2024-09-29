import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TermsOfUserPage from './terms-of-use/page'
import GeneralProvitionsPage from './general-provitions/page'
import CommunicationPage from './communications/page'
import ClaimResolution from './claims-resolution/page'
import GoverningLaw from './governing-law/page'
import ForceMajeure from './force-majeure/page'
import LiabilityIdemnityPage from './liability-and-indemnity/page'
import TermAndTermination from './term-and-termination/page'
import FaqsFinalProvisionsPage from './final-provisions/page'
import RightsAndObligations from './rights-and-obligations/page'
import RiskDisclosure from './risks-disclosure/page'
import LiabilityOfTheParties from './liability-of-the-parties/page'
import PrivacyPolicy from './privacy-policy/page'

const LayoutFaqPageView = () => {
  return (
    <Routes>
        <Route path={"/terms-of-use"} element={<TermsOfUserPage />} />
        <Route path={"/general-provitions"} element={<GeneralProvitionsPage />} />
        <Route path={"/communications"} element={<CommunicationPage />} />
        <Route path={"/claims-resolution"} element={<ClaimResolution />} />
        <Route path={"/governing-law"} element={<GoverningLaw />} />
        <Route path={"/force-majeure"} element={<ForceMajeure />} />
        <Route path={"/liability-of-the-parties"} element={<LiabilityOfTheParties />} />
        <Route path={"/term-and-termination"} element={<TermAndTermination />} />
        <Route path={"/final-provisions"} element={<FaqsFinalProvisionsPage />} />
        <Route path={"/rights-and-obligations"} element={<RightsAndObligations />} />
        <Route path={"/risks-disclosure"} element={<RiskDisclosure />} />
        <Route path={"/liability-and-indemnity"} element={<LiabilityIdemnityPage />} />
        <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
        <Route path={"*"} element={<Navigate to={"/not-found-guest"} />} />
    </Routes>
  )
}

export default LayoutFaqPageView
