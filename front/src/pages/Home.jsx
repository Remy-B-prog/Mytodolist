import React from 'react'
import Button from '../component/Button'
import Title from '../component/Title'

export default function home() {
  return (
    <div className ="flex flex-col justify-around min-h-screen items-center p-10 lg:w-[48rem] lg:h-[47rem]">
      <Title title='MyToDoList' />
      <p className='flex justify-center ' >Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a  </p>
      <div className='w-full'>
        <div className ="mb-4 ">
      <Button text="S'inscrire" redirection="/inscription" />
        </div>
      <Button text='Connexion' redirection='/connexion' />
      </div>
    </div>
  )
}
