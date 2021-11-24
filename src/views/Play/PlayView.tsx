import React, { useContext, useEffect, useState } from 'react'
import { Container, Wrapper, Box } from '3oilerplate'
import randomColor from 'randomcolor'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import useMousetrap from "react-hook-mousetrap"


const initialPlayer = { x: 0, y: 0 }

const PlayView = () => {
  const { grid, setGrid, bombs, setBombs }: any = useContext(MapContext)
  const [players, setPlayers] = useState<any[]>([{...initialPlayer}, {...initialPlayer}])
  const [blocks] = useState(20)

  useMousetrap('up', () => move(0, 'y', -1))
  useMousetrap('down', () => move(0, 'y', 1))
  useMousetrap('left', () => move(0, 'x', -1))
  useMousetrap('right', () => move(0, 'x', 1))
  useMousetrap('space', () => attack(0))

  useMousetrap('w', () => move(1, 'y', -1))
  useMousetrap('s', () => move(1, 'y', 1))
  useMousetrap('a', () => move(1, 'x', -1))
  useMousetrap('d', () => move(1, 'x', 1))
  useMousetrap('shift', () => attack(1))

  function move (playerIndex: number, direction: string, movement: number) {
    const newPlayer = { ...players[playerIndex] }

    if (newPlayer[direction] + movement > blocks || newPlayer[direction] + movement < 0) {
      return;
    }

    newPlayer[direction] += movement
    console.log(newPlayer)

    const block = Object.values(grid).find(({ x, y, stone, brick }: any) => (x === newPlayer.x && y === newPlayer.y) && (stone || brick))

    if (block) {
      return
    }

    const newPlayers = [...players]
    newPlayers[playerIndex] = { ...players[playerIndex], ...newPlayer }
    setPlayers(newPlayers)
  }

  function attack(playerIndex: number) {
    const { x, y }: any = { ...players[playerIndex] }
    const posKey = `${x}/${y}`
    setBombs({ ...bombs, [posKey]: { x, y, bomb: true }})



    setTimeout(() => {
      setBombs((currentBombs: any) => ({ ...currentBombs, [posKey]: { x, y, bomb: false }}))
    }, 3000)
  }

  // const getBlock = (player: any) => {
  //   Object.values(grid).find(({x, y}: any) => (x === player.x && y === player.y))
  // }

  // function updateBlock(player: any, update: any)  {
  //   const posKey = `${player.x}/${player.y}`
  //   let newGrid = { ...grid }
  //   newGrid = { ...newGrid, [posKey]: { ...newGrid[posKey], ...update }}
  //   setGrid({ ...newGrid })
  // }

  useEffect(() => {
    const newPlayers = players.map((player: any, index: number) => {
      player.color = randomColor({
        luminosity: 'dark',
      })

      if (players.length === 2) {
        if (index === 1) {
          return {
            ...player,
            x: blocks,
            y: blocks
          }
        }
      }

      if (index === 1) {
        return {
          ...player,
          x: blocks,
          y: 0
        }
      }

      if (index === 2) {
        return {
          ...player,
          x: 0,
          y: blocks
        }
      }

      if (index === 3) {
        return {
          ...player,
          x: blocks,
          y: blocks
        }
      }

      return player
    })

    setPlayers(newPlayers)
  }, [])

  return (
    <Wrapper>
      <Container style={{ alignItems: 'center' }}>
        <Box
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          { players.map((player, playerIndex) => (
            <Box
              style={{
                display: 'inline-flex',
                width: '100%',
                // flexBasis: players.length === 2 ? '100%' : '45%',
                justifyContent: 'center',
              }}
            >
              <Controls
                onMove={(direction: string, movement: number) => move(playerIndex, direction, movement)}
                onAttack={() => attack(playerIndex)}
                color={players[playerIndex].color}
                index={playerIndex}
              />
            </Box>
          )) }
        </Box>
        <Box style={{ flexGrow: 1, height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Map blocks={blocks} players={players} setPlayers={setPlayers} />
        </Box>
      </Container>
    </Wrapper>
  )
}

export default PlayView
