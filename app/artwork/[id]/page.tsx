"use client";

import styled from "styled-components";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArtworkDetail } from "@/app/interfaces/artwork";

const PageWrapper = styled.main`
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    font-family: Georgia, serif;
`;

const BackLink = styled(Link)`
    display: inline-block;
    margin-bottom: 1.5rem;
    color: #8b0000;
    text-decoration: none;
    font-size: 0.95rem;
    &:hover { text-decoration: underline; }
`;

const ArtworkLayout = styled.div`
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const ArtworkImage = styled.img`
    width: 100%;
    max-width: 380px;
    border-radius: 4px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    object-fit: contain;
`;

const NoImage = styled.div`
    width: 380px;
    height: 300px;
    background: #f0ebe5;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a89c90;
    font-style: italic;
`;

const InfoPanel = styled.div`
    flex: 1;
    min-width: 240px;
`;

const ArtworkTitle = styled.h1`
    font-size: 1.7rem;
    color: #222;
    margin: 0 0 0.5rem;
    border-bottom: 2px solid #8b0000;
    padding-bottom: 0.5rem;
`;

const MetaRow = styled.div`
    margin: 0.6rem 0;
    font-size: 0.95rem;
    color: #444;
    line-height: 1.5;
`;

const MetaLabel = styled.span`
    font-weight: bold;
    color: #222;
    margin-right: 0.4rem;
`;

const HamLink = styled.a`
    display: inline-block;
    margin-top: 1.2rem;
    padding: 0.5rem 1.1rem;
    background: #8b0000;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
    &:hover { background: #a50000; }
`;

const StatusMessage = styled.p`
    text-align: center;
    color: #666;
    margin-top: 3rem;
    font-size: 1rem;
`;

const ErrorMessage = styled.p`
    text-align: center;
    color: #b00020;
    font-size: 1rem;
    margin-top: 3rem;
    background: #fff0f0;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    border: 1px solid #f5c6cb;
`;

export default function ArtworkPage() {
    const params = useParams();
    const id = params.id as string;

    const [artwork, setArtwork] = useState<ArtworkDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const res = await fetch(`/api/artwork/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Failed to load artwork details.");
                } else {
                    setArtwork(data);
                }
            } catch {
                setError("A network error occurred. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
    }, [id]);

    if (loading) return (
        <PageWrapper>
            <BackLink href="/">← Back to search</BackLink>
            <StatusMessage>Loading artwork…</StatusMessage>
        </PageWrapper>
    );

    if (error) return (
        <PageWrapper>
            <BackLink href="/">← Back to search</BackLink>
            <ErrorMessage>{error}</ErrorMessage>
        </PageWrapper>
    );

    if (!artwork) return null;

    const artist = artwork.people?.find((p) => p.role === "Artist") ?? artwork.people?.[0];

    return (
        <PageWrapper>
            <BackLink href="/">← Back to search</BackLink>
            <ArtworkLayout>
                {artwork.primaryimageurl ? (
                    <ArtworkImage src={artwork.primaryimageurl} alt={artwork.title} />
                ) : (
                    <NoImage>No image available</NoImage>
                )}

                <InfoPanel>
                    <ArtworkTitle>{artwork.title}</ArtworkTitle>

                    {artist && (
                        <MetaRow>
                            <MetaLabel>Artist:</MetaLabel>{artist.name}
                        </MetaRow>
                    )}
                    {artwork.dated && (
                        <MetaRow>
                            <MetaLabel>Date:</MetaLabel>{artwork.dated}
                        </MetaRow>
                    )}
                    {artwork.culture && (
                        <MetaRow>
                            <MetaLabel>Culture:</MetaLabel>{artwork.culture}
                        </MetaRow>
                    )}
                    {artwork.classification && (
                        <MetaRow>
                            <MetaLabel>Classification:</MetaLabel>{artwork.classification}
                        </MetaRow>
                    )}
                    {artwork.medium && (
                        <MetaRow>
                            <MetaLabel>Medium:</MetaLabel>{artwork.medium}
                        </MetaRow>
                    )}
                    {artwork.technique && (
                        <MetaRow>
                            <MetaLabel>Technique:</MetaLabel>{artwork.technique}
                        </MetaRow>
                    )}
                    {artwork.dimensions && (
                        <MetaRow>
                            <MetaLabel>Dimensions:</MetaLabel>{artwork.dimensions}
                        </MetaRow>
                    )}
                    {artwork.department && (
                        <MetaRow>
                            <MetaLabel>Department:</MetaLabel>{artwork.department}
                        </MetaRow>
                    )}
                    {artwork.creditline && (
                        <MetaRow>
                            <MetaLabel>Credit:</MetaLabel>{artwork.creditline}
                        </MetaRow>
                    )}
                    {artwork.description && (
                        <MetaRow>
                            <MetaLabel>Description:</MetaLabel>{artwork.description}
                        </MetaRow>
                    )}

                    {artwork.url && (
                        <HamLink href={artwork.url} target="_blank" rel="noreferrer">
                            View on Harvard Art Museums →
                        </HamLink>
                    )}
                </InfoPanel>
            </ArtworkLayout>
        </PageWrapper>
    );
}
