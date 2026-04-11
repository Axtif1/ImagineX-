import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { PromptInput } from '../components/PromptInput';
import { GeneratedImage } from '../components/GeneratedImage';

export const GeneratePage = () => {
  const [generationState, setGenerationState] = useState({
    isGenerating: false,
    result: null // { imageUrl, prompt, style }
  });

  const handleGenerate = ({ prompt, style }) => {
    setGenerationState({ isGenerating: true, result: null });
    
    // Simulate API call for image generation
    setTimeout(() => {
      setGenerationState({
        isGenerating: false,
        result: {
          imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/1000`, 
          prompt,
          style
        }
      });
    }, 3000);
  };

  const handlePost = (imageUrl) => {
    console.log("Posting image to feed:", imageUrl);
    // TODO: implement logic to add to mockPosts
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10">
          <div className="max-w-[1200px] mx-auto animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-white mb-2">Create an Image</h1>
            <p className="text-zinc-400 mb-8">Turn your words into reality using state-of-the-art AI.</p>
            
            <PromptInput 
              onGenerate={handleGenerate} 
              isGenerating={generationState.isGenerating} 
            />

            {(generationState.isGenerating || generationState.result) && (
              <div className="mt-12 w-full pt-12 border-t border-zinc-800/50">
                <GeneratedImage 
                  isGenerating={generationState.isGenerating}
                  imageUrl={generationState.result?.imageUrl}
                  prompt={generationState.result?.prompt}
                  style={generationState.result?.style}
                  onPost={handlePost}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
