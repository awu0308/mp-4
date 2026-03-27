"use client";

import styled from "styled-components";
import { useState } from "react";
import ArtworkCard from "./components/ArtworkCard";
import { ArtworkSummary } from "./interfaces/artwork";

const PageWrapper = styled.main`
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    font-family: Georgia, serif;
`;

const PageHeader = styled.header`
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 3px solid #8b0000;
`;

const PageTitle = styled.h1`
    font-size: 2.4rem;
    color: #8b0000;
    margin-bottom: 0.4rem;
`;

const PageSubtitle = styled.p`
    color: #666;
    font-size: 1rem;
    margin: 0;
`;

const SearchBar = styled.div`
    display: flex;
    gap: 0.6rem;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const SearchInput = styled.input`
    padding: 0.65rem 1rem;
    font-size: 1rem;
    border: 1px solid #bbb;
    border-radius: 4px;
    width: 340px;
    font-family: Georgia, serif;
    &:focus {
        outline: 2px solid #8b0000;
        border-color: #8b0000;
    }
`;

const SearchBtn = styled.button`
    padding: 0.65rem 1.5rem;
    font-size: 1rem;
    background: #8b0000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Georgia, serif;
    &:hover:not(:disabled) {
        background: #a50000;
    }
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

const ResultsGrid = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const StatusMessage = styled.p`
    text-align: center;
    color: #666;
    font-size: 1rem;
    margin: 2rem 0;
`;

const ErrorMessage = styled.p`
    text-align: center;
    color: #b00020;
    font-size: 1rem;
    margin: 2rem 0;
    background: #fff0f0;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    border: 1px solid #f5c6cb;
`;

const ResultCount = styled.p`
    text-align: center;
    color: #444;
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ArtworkSummary[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastQuery, setLastQuery] = useState("");

    const search = async () => {
        const trimmed = query.trim();
        if (!trimmed) return;

        setLoading(true);
        setError(null);
        setLastQuery(trimmed);

        try {
            const res = await fetch(`/api/searchArtworks?q=${encodeURIComponent(trimmed)}`);
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong. Please try again.");
                setResults(null);
            } else {
                setResults(data.records || []);
            }
        } catch {
            setError("A network error occurred. Please check your connection and try again.");
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") search();
    };

    return (
        <PageWrapper>
            <PageHeader>
                <PageTitle>Harvard Art Museums Explorer</PageTitle>
                <PageSubtitle>
                    Search and explore thousands of artworks from the Harvard Art Museums collection
                </PageSubtitle>
            </PageHeader>

            <SearchBar>
                <SearchInput
                    type="text"
                    value={query}
                    placeholder='e.g. "landscape", "portrait", "still life"'
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <SearchBtn onClick={search} disabled={loading || !query.trim()}>
                    {loading ? "Searching…" : "Search"}
                </SearchBtn>
            </SearchBar>

            {loading && <StatusMessage>Loading artworks…</StatusMessage>}

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {!loading && results !== null && (
                <>
                    {results.length === 0 ? (
                        <StatusMessage>
                            No artworks found for &ldquo;{lastQuery}&rdquo;. Try a different search term.
                        </StatusMessage>
                    ) : (
                        <>
                            <ResultCount>
                                Showing {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{lastQuery}&rdquo;
                            </ResultCount>
                            <ResultsGrid>
                                {results.map((artwork) => (
                                    <ArtworkCard key={artwork.id} {...artwork} />
                                ))}
                            </ResultsGrid>
                        </>
                    )}
                </>
            )}

            {results === null && !loading && !error && (
                <StatusMessage>Enter a keyword above to explore the collection.</StatusMessage>
            )}
        </PageWrapper>
    );
}
