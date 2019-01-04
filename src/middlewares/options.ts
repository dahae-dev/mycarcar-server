/**
 * origin은 외부 접속을 허용할 도메인을 값으로 받고, *는 모든 외부 접속을 허용하겠다는 의미.
 * methods는 REST api에 명시된 메소드중 허용할 메소드를 받음.
 * exposedHeaders는 표준 헤더 외의 헤더를 axios에서 사용할 수 있도록 허용.
 */
export const corsOption = {
  origin: "*",
  methods: "GET, PUT, PATCH, POST, DELETE",
  exposedHeaders: "x-access-token",
};
