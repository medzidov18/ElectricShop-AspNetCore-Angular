Добрый день! Этот проект я писал сам, с чистого нуля. Это онлайн магазин электронной техники,
бекенд написан на С#, а фронтенд написан на Ангуляре. Этот проект не закончен, он в разработке и будет
изменяться время от времени. Тут есть основная страница сайта с сортировкой товара, корзиной товаров, 
есть панель администратора, где он может добавлять, изменять и удаялть устройства и так далее. 
Администраторы имеют свой собстенный логин и парольЮ по которым они могут заходить к себе.

Список технологий:
Бекенд: .NET 6, Entity Framework, LINQ, JWT Tokens
Фронтенд: HTML 5, CSS 3, Angular 14, Typescript, Bootstrap
База данных: MS SQL
Тестирование: xUnit, FakeItEasy

Апи имеет множемтво методов и функций с различными Http запросами:
![image](https://user-images.githubusercontent.com/105280702/202467180-b6c9357d-129d-47bb-80c4-f2a40bba740b.png)


Вот так выглядит мой апи в сваггере:
![image](https://user-images.githubusercontent.com/105280702/202464046-ec1a51ed-33c1-4116-83c3-dac919fc64aa.png)

В моей базе данных есть таблицы пользователей, товаров, дочерние таблицы для товаров:
![image](https://user-images.githubusercontent.com/105280702/202464869-573d11a9-b08d-40c8-a26e-b6a11c3740a4.png)

У меня два агуляр проета, один основной, а второй для администратора.
Основной проект выглядит так:
![image](https://user-images.githubusercontent.com/105280702/202465081-1d38aefb-e331-4c5d-b2e7-05f41382503f.png)
![image](https://user-images.githubusercontent.com/105280702/202465166-9a3f301a-d6c8-49ea-8a8c-5a45770e63a0.png)

Так же в основном проекте есть корзина желаемых товаров, в которую можно класт любые товары:
![image](https://user-images.githubusercontent.com/105280702/202465384-7313fbf7-5e00-4d86-aa65-623b3d05a074.png)

Прежде чем зайнти в панель администратора, надо ввести свой логин и пароль:
![image](https://user-images.githubusercontent.com/105280702/202465666-06ce22f8-8f58-4d6d-8293-4096c3857304.png)

После входа мы попадаем в саму панель:
![image](https://user-images.githubusercontent.com/105280702/202465892-a54b1167-446f-40b2-972b-6c6a5cde3bdc.png)

Изменять или добавлять товар можно в выплывающем окне:
![image](https://user-images.githubusercontent.com/105280702/202466110-4f692617-7e6d-447b-9fd2-fb4cd9c7d4ae.png)

Я начал писать тесты для своего проекта, например:
![image](https://user-images.githubusercontent.com/105280702/202466657-087cbab3-ba39-42fc-998a-1c995927e298.png)

Это не конечный результат моего проекта, я буду работать над ним много, на данный момент он выглядит так.
