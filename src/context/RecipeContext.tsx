import React, { createContext, useState } from 'react'

export const RecipeContext = createContext({})

export const RecipeProvider = ({ children }: any) => {
  const [steps, setSteps] = useState<any>([])

  // function getRandomRecipe() {
  //   return sample(recipe)
  // }

  // useEffect(() => {
  // }, [])

  return (
    <RecipeContext.Provider
      value={{
        steps,
        setSteps,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}
