import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image }) => {
    const siteTitle = 'Fortifier - Advanced Protection Services';
    const defaultDescription = 'Fortifier provides advanced protection services for your assets and peace of mind.';
    const defaultKeywords = 'security, protection, surveillance, safety, fortifier';
    const siteUrl = 'https://fortifier.com.au'; // Replace with actual domain
    const defaultImage = '/og-image.jpg'; // Replace with actual default image

    const finalTitle = title ? `${title} | Fortifier` : siteTitle;
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || defaultKeywords;
    const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
    const finalImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />
        </Helmet>
    );
};

export default SEO;
