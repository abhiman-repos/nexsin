"use client";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        background: "lightgreen",
      }}
      onClick={() => alert("PAGE CLICK WORKING")}
    >
      TEST PAGE
    </div>
  );
}
