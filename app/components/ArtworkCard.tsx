"use client";

import styled from "styled-components";
import Link from "next/link";
import { ArtworkSummary } from "@/app/interfaces/artwork";

const CardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Card = styled.div`
    width: 220px;
    border: 1px solid #d6cfc7;
    border-radius: 6px;
    overflow: hidden;
    margin: 0.75rem;
    background: #fff;
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover {
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 175px;
    object-fit: cover;
    display: block;
    background: #f0ebe5;
`;

const NoImage = styled.div`
    width: 100%;
    height: 175px;
    background: #f0ebe5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a89c90;
    font-size: 0.85rem;
    font-style: italic;
`;

const CardBody = styled.div`
    padding: 0.7rem 0.85rem;
`;

const ArtworkTitle = styled.h3`
    font-size: 0.9rem;
    margin: 0 0 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #222;
`;

const ArtworkMeta = styled.p`
    font-size: 0.78rem;
    color: #777;
    margin: 0.15rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export default function ArtworkCard({ id, title, primaryimageurl, dated, culture, medium }: ArtworkSummary) {
    return (
        <CardLink href={`/artwork/${id}`}>
            <Card>
                {primaryimageurl ? (
                    <CardImage src={primaryimageurl} alt={title} />
                ) : (
                    <NoImage>No image available</NoImage>
                )}
                <CardBody>
                    <ArtworkTitle title={title}>{title}</ArtworkTitle>
                    {dated && <ArtworkMeta>{dated}</ArtworkMeta>}
                    {culture && <ArtworkMeta>{culture}</ArtworkMeta>}
                    {medium && <ArtworkMeta style={{ fontStyle: "italic" }}>{medium}</ArtworkMeta>}
                </CardBody>
            </Card>
        </CardLink>
    );
}
