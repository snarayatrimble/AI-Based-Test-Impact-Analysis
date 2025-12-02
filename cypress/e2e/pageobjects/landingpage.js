class landingpage {

    getUser() {
        return cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > :nth-child(3) > #signInFormUsername');
    }

    getNextButton() {
        return cy.get('button[name="username-submit"]');
    }

    getPassword() {
        return cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > :nth-child(5) > #signInFormPassword');
    }

    getSubmit() {
        return cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > .btn');
    }

    getHeader() {
        return cy.get('ttl-header[header-title="Customer Hub"]');
    }
    getFleetworksLogo() {
        return cy.get('img[alt="FleetWorks-logo"]');
    }

    getFleetworksText() {
        return cy.get('p')
    }

    getFleetcockpitLogo() {
        return cy.get('img[alt="FleetCockpit-logo"]');
    }

    getPerformancePortalLogo() {
        return cy.get('img[alt="Performance Portal-logo"]');
    }

    getWorkFlowLogo() {
        return cy.get('img[alt="My TrimbleT&L-logo"]');
    }

    getVideoIntelligenceLogo() {
        return cy.get('img[alt="Video Intelligence-logo"]');
    }


    getFleetCockpitMobileLogo() {
        return cy.get('img[alt="Fleetcockpit Mobile-logo"]');
    }

    getDocumentationPortalLogo() {
        return cy.get('img[alt="Documentation Portal-logo"]');
    }

    getExploreMore() {
        return cy.get('img[alt="Documentation Portal-logo"]');
    }

    getCookieAccept() {
        return cy.get('button[id="onetrust-accept-btn-handler"]');
    }

    getFleetViewLogo() {
        return cy.get('img[alt="FleetCockpit+-logo"]');
    }
    
}
export default landingpage


