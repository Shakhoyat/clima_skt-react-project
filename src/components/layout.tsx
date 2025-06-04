import React, { type PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      header
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-12">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>Made by Shakhoyat Rahman❤️!</p>
        </div>
      </footer>
    </div>
  );
};

export default layout;
