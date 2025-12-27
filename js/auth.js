// js/auth.js
// ==================== 1. FUNGSI UTAMA LOGIN ====================
window.loginUser = async function(event) {
    event.preventDefault(); // Stop form dari reload halaman

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('errorMessage');

    // Reset pesan error
    errorElement.style.display = 'none';
    errorElement.textContent = '';

    // 1. LOGIN dengan Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        // Tampilkan error
        errorElement.textContent = '❌ Login gagal: ' + error.message;
        errorElement.style.display = 'block';
        return;
    }

    // 2. JIKA SUKSES: Ambil role user dari tabel 'user_profiles'
    const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', data.user.id)
        .single(); // Harus dapat 1 data

    if (profileError || !profile) {
        errorElement.textContent = '❌ Profil pengguna tidak ditemukan. Hubungi Admin.';
        errorElement.style.display = 'block';
        await supabase.auth.signOut();
        return;
    }

    // 3. ARAHKAN ke halaman DASHBOARD sesuai ROLE
    const role = profile.role;
    switch(role) {
        case 'admin':
            window.location.href = 'dashboard-admin.html';
            break;
        case 'operator_opd':
            window.location.href = 'dashboard-opd.html';
            break;
        case 'verifikator_operator':
        case 'verifikator_kabid':
        case 'verifikator_kasda':
            window.location.href = 'dashboard-verifikator.html';
            break;
        default:
            errorElement.textContent = '❌ Peran tidak dikenali.';
            errorElement.style.display = 'block';
    }
};

// ==================== 2. FUNGSI LOGOUT (untuk dashboard nanti) ====================
window.logoutUser = async function() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
};
