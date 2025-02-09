import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        
        // バリデーション
        if (!data.title || !data.description || !data.content) {
            return new Response(JSON.stringify({
                error: '必須フィールドが不足しています'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // スラッグの生成
        const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // ファイルパスの生成
        const contentDir = path.join(process.cwd(), 'src/content/blog');
        const filePath = path.join(contentDir, `${slug}.md`);

        // フロントマターの作成
        const frontMatter = `---
title: ${data.title}
description: ${data.description}
pubDate: ${data.pubDate}
draft: ${data.draft}
${data.tags?.length ? `tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]` : ''}
${data.coverImage ? `coverImage: "${data.coverImage}"` : ''}
---

${data.content}`;

        // ディレクトリの存在確認と作成
        try {
            await fs.access(contentDir);
        } catch {
            await fs.mkdir(contentDir, { recursive: true });
        }

        // ファイルの書き込み
        await fs.writeFile(filePath, frontMatter, 'utf-8');

        return new Response(JSON.stringify({
            success: true,
            slug
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({
            error: '投稿の作成に失敗しました'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};