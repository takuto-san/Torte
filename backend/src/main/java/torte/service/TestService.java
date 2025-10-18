package torte.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import torte.model.TestModel.TestStudentDetail;

@Service
public class TestService {

    private final Map<String, TestStudentDetail> store = new ConcurrentHashMap<>();

    // Constructor（1件だけ登録）
    public TestService() {
        String id = UUID.randomUUID().toString();
        store.put(id, new TestStudentDetail(id, "太郎", "taro@example.com"));
    }

    // GET
    public TestStudentDetail getStudentDetailById(String id) {
        return store.get(id);
    }

    // POST
    public TestStudentDetail registerStudent(TestStudentDetail detail) {
        String id = UUID.randomUUID().toString();
        TestStudentDetail saved = new TestStudentDetail(id, detail.getName(), detail.getEmail());
        store.put(id, saved);
        return saved;
    }
}