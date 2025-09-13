
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
    isCompanionOpen: boolean;
    setCompanionOpen: (isOpen: boolean) => void;
    isOnBiblePage: boolean;
    setIsOnBiblePage: (isOnBiblePage: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [isCompanionOpen, setCompanionOpen] = useState(false);
    const [isOnBiblePage, setIsOnBiblePage] = useState(false);

    return (
        <LayoutContext.Provider value={{ isCompanionOpen, setCompanionOpen, isOnBiblePage, setIsOnBiblePage }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayoutContext must be used within a LayoutProvider');
    }
    return context;
}
