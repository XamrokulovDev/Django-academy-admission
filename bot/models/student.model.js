const supabase = require("../config/supabase");

async function saveStudent(chatId) {
    try {
        const { data: existingUser, error: selectError } = await supabase
            .from("students")
            .select("chat_id")
            .eq("chat_id", chatId)
            .maybeSingle();

        if (selectError) {
            console.error("Error checking existing user:", selectError);
            return { success: false, message: "Xatolik yuz berdi." };
        }

        if (existingUser) {
            return { success: false, message: "Siz allaqachon ro'yxatdan o'tgansiz!" };
        }

        const { error: insertError } = await supabase
            .from("students")
            .insert([{ chat_id: chatId }]);

        if (insertError) {
            console.error("Error inserting user:", insertError);
            return { success: false, message: "Ma'lumot saqlanmadi." };
        }

        return { success: true, message: "Assalomu alaykum Botimizga xush kelibsiz! Iltimos Ismingizni kiriting! " };

    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, message: "Ichki xatolik yuz berdi." };
    }
}

module.exports = { saveStudent };