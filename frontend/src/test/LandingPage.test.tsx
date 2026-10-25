import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '../portals/landing/pages/LandingPage';

describe('LandingPage component', () => {
  it('renders landing page hero title and header', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Embu Level Five Hospital Diabetes Care Platform/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Type 2 Diabetes Control & Clinical Self-Management/i)
    ).toBeInTheDocument();
  });

  it('allows switching between Sign In and Register Patient tabs', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const registerTabs = screen.getAllByRole('button', { name: /Register Patient/i });
    fireEvent.click(registerTabs[0]);

    expect(screen.getByText(/New Patient Registration/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Amina/i)).toBeInTheDocument();

    const signInTabs = screen.getAllByRole('button', { name: /Sign In/i });
    fireEvent.click(signInTabs[1] || signInTabs[0]);

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });
});
