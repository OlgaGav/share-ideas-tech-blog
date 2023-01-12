-- SELECT `blogpost`.`id`,
--     `blogpost`.`title`,
--     `blogpost`.`post`,
--     `blogpost`.`posted_date`,
--     `blogpost`.`user_id`,
--     `blogpost`.`created_at`,
--     `blogpost`.`updated_at`
-- FROM `blog_db`.`blogpost`;

select b.id, b.title, c.id, c.content, c.created_at, u.name
from blogpost as b
left join comment as c on c.blogpost_id = b.id
join user as u on c.user_id = u.id
where b.id = 1
order by c.created_at

-- SELECT t.id, t.topic_name, t.price, t.initial_shares, t.updated_at, COUNT(sh.id) as sharesCount
--     FROM topic AS t
--     LEFT JOIN shares AS sh ON t.id = sh.topic_id
--     GROUP BY t.id
--     ORDER BY t.updated_at