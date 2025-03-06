import React from "react"

export interface ILoadingAndStatusProps {
    loading: boolean
    error: string | null
    success: string | null
    setError: React.Dispatch<React.SetStateAction<string | null>>
    setSuccess: React.Dispatch<React.SetStateAction<string | null>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}