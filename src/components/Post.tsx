import { format, formatDistanceToNow } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({author, publishedAt, content}:PostProps) { //desestruturando a props para evitar repetir o nome props.
    const [comments, setComments] = useState([
       'Show de bola'
    ])

    const [newCommentText, setNewCommentText] = useState('')
    
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR,
    })
    
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
        locale: ptBR, 
         addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        
        setComments([...comments, newCommentText]);
        setNewCommentText('');//para voltar ao estado inicial 
    }

    function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');//indicando para o React que o user já digitou alguma coisa e parar com a mensagem de erro 
        setNewCommentText(event.target.value);//para armazenar um novo estado para um novo comentario
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {//função para alertar o user de que o campo está vazio
        event.target.setCustomValidity('Esse campo é obrigátorio!');
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

       setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0; //criando variavel auxiliar para deixar o código mais legivél e mais facíl de dar manutenção/ Clean Code

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
               {content.map(line => {
                if (line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                }else if(line.type === 'link') {
                    return <p key={line.content}><a href='#'>{line.content}</a></p>;
                }
               })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment" /*para utilizar no target para armazenar o texto digitado pelo usuario */
                    placeholder="Deixe seu comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}//para monitorar quando o user digitar
                    onInvalid={handleNewCommentInvalid}
                    required //propriedade para impedir que o usuario publique campo vazio
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}/*para desabilitar o botão de publicar quando não stiver nada digitado */>
                        Publicar
                    </button>
                </footer>
            </form>


            <div className={styles.commentList}>
                {comments.map(comment => {
                    return( 
                      <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment}//passando a função deleteComment como propriedade para poder utilizar no componente Comment
                    />
                    )    
                })}
            </div>
        </article>
    );
} 