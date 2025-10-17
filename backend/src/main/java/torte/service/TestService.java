package torte.service;

import org.springframework.stereotype.Service;
import torte.model.TestModel.TestStudentDetail;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

@Service
public class TestService {

    private final Map<String, TestStudentDetail> store = new ConcurrentHashMap<>();

    public TestService() {
        // サンプルデータ
        String id = UUID.randomUUID().toString();
        store.put(id, new TestStudentDetail(id, "太郎", "taro@example.com"));
    }

    public TestStudentDetail getStudentDetailById(String id) {
        return store.get(id);
    }

    public TestStudentDetail registerStudent(TestStudentDetail detail) {
        String id = UUID.randomUUID().toString();
        TestStudentDetail saved = new TestStudentDetail(id, detail.getName(), detail.getEmail());
        store.put(id, saved);
        return saved;
    }
}