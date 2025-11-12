import { useEffect, useState } from "react";

export default function useDarkSide() {
    const [theme, setTheme] = useState<"light" | "dark" | null>(null);

    // Load theme from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            const initialTheme = savedTheme
                ? (savedTheme as "light" | "dark")
                : prefersDark
                    ? "dark"
                    : "light";

            setTheme(initialTheme);
            document.documentElement.classList.toggle("dark", initialTheme === "dark");
        }
    }, []);

    // Apply changes whenever theme changes
    useEffect(() => {
        if (theme) {
            localStorage.setItem("theme", theme);
            document.documentElement.classList.toggle("dark", theme === "dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return [theme, toggleTheme] as const;
}
