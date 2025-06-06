// ... importaciones previas ...
<Route path="/courses" element={
  <RequireAuth roles={["admin", "director", "teacher"]}>
    <Courses />
  </RequireAuth>
}/>
// ... el resto igual ...