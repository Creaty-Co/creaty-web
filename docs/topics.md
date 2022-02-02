# topics

Это название было выбрано на скорую руку, сейчас пока так, но если это будет критично, то преполагается рефакторинг.

## Список неймингов тем

| Название           | На Русском                    |
| ------------------ | ----------------------------- |
| architecture       | Архитектура                   |
| design             | Дизайн                        |
| art                | Изобразительное искусство     |
| craft-jewellery    | Крафт и ювелирное дело        |
| games-animation    | Игры и анимация               |
| movies-tv-photos   | Кино, ТВ и фото               |
| fashion-design     | Дизайн одежды                 |
| music-sound        | Музыка и звук                 |
| theater-scene-art  | Театр и сценическое искусство |
| digital-design     | Диджитал дизайн               |
| art-management     | Арт-менеджмент                |
| journalism-writing | Журналистика и письмо         |

## Типизация

Каждый `тэг` состоит из айди, названия и зависимости `топика`

```ts
interface TopicType {
  id: number;
  name: string;
}

interface TopicTagType {
  id: number;
  name: string;
  topic: number; // Topic id к которому этот тэг принадлежит. Тэг всегда привязан к одному топику
}
```

## Изменения

При изменение или добавлении новых топиков нужно учитывать, что они упоминаються в следующие файлах

- src\app\assets\lang\[lang].json => views.home.mentorSearch.staticTopics
  https://github.com/codepandoradev/creaty-frontend/blob/012501589b21663c46710b039336ce73dfad5326/src/app/assets/lang/ru.json#L23
- https://github.com/codepandoradev/creaty-frontend/blob/cc4e8e026a3c70d4fae70da0cb432ff7e90984e6/src/app/views/home/HomeView.tsx#L62
- https://github.com/codepandoradev/creaty-frontend/blob/e026c1e47bbfad0ebb6057b2f214f1eab4db72cf/src/app/components/other/MentorSearch/MentorSearch.tsx#L12
