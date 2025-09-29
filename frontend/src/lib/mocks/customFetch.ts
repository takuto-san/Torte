export const customFetch = async <TData>(
  url: string,
  options: RequestInit = {},
): Promise<TData> => {
  const baseUrl = "http://localhost:8080"; // 環境変数などから取得するのが望ましい
  const requestUrl = new URL(url, baseUrl);

  const headers = {
    "Content-Type": "application/json", // デフォルトのヘッダー
    ...options.headers,
    // 必要に応じて認証トークンなどを追加
    // Authorization: `Bearer YOUR_TOKEN`,
  };

  try {
    const response = await fetch(requestUrl, {
      ...options,
      headers,
    });

    // エラー時: 今回はシンプルにステータスのみを含むエラーを throw
    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`,
      );
    }

    // 成功時: レスポンスを JSON としてパース
    const data: TData = await response.json();
    return data;
  } catch (error) {
    console.error("customFetch Error:", error);
    throw error;
  }
};
