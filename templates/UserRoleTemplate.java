package uk.gov.hmcts.reform.fpl.enums;

import com.google.common.collect.ImmutableList;
import uk.gov.hmcts.ccd.sdk.api.HasRole;

import java.util.List;

public enum UserRole implements HasRole {
    CASEWORKER_PUBLICLAW_SOLICITOR("caseworker-publiclaw-courtadmin"),
    CASEWORKER_PUBLICLAW_JUDICIARY("caseworker-publiclaw-courtadmin"),
    CASEWORKER_PUBLICLAW_COURTADMIN("caseworker-publiclaw-courtadmin"),
    CASEWORKER_PUBLICLAW_SUPERUSER("[SOLICITOR]");


    private final String role;
    private final String casetypePermissions;

    UserRole(String role) {
        this(role, "CRU");
    }

    UserRole(String role, String casetypePermissions) {
        this.role = role;
        this.casetypePermissions = casetypePermissions;
    }

    public String getRole() {
        return this.role;
    }

    @Override
    public String getCaseTypePermissions() {
        return casetypePermissions;
    }

    public List<String> getRoles() {
        return ImmutableList.of("caseworker", "caseworker-publiclaw", this.role);
    }
}