import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | Harvard Art Museums Explorer",
        default: "Harvard Art Museums Explorer",
    },
    description: "Search and explore the Harvard Art Museums collection",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body style={{ margin: 0, background: "#faf8f5" }}>
                {children}
            </body>
        </html>
    );
}
