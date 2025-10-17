package torte.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public class TestModel {

    public static class TestStudentDetail {
        private String id;

        @NotBlank
        private String name;

        @Email
        private String email;

        public TestStudentDetail() {}

        public TestStudentDetail(String id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        // getters / setters
        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
    }

    // -- TestErrorResponse --
    public static class TestErrorResponse {
        private int status;
        private String message;

        public TestErrorResponse() {}

        public TestErrorResponse(int status, String message) {
            this.status = status;
            this.message = message;
        }

        // getters / setters
        public int getStatus() {
            return status;
        }
        public void setStatus(int status) {
            this.status = status;
        }
        public String getMessage() {
            return message;
        }
        public void setMessage(String message) {
            this.message = message;
        }
    }
}