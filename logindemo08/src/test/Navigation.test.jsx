import { describe, expect, it, afterEach, vi } from "vitest"
import { render, screen, cleanup } from '@testing-library/react';
import Navigation from "../Components/Navigation";

describe("navigation Component",() => {
    afterEach(cleanup)
    
    
    it("renders text home", () => {
          render(<Navigation/>)
        const hometext = screen.getAllByText( /home/i)
        expect(hometext).toBeDefined()
    })
     
 
    }) 
    