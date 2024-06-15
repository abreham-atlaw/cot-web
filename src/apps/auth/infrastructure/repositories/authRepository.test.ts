/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthRepository from "./authRepository";
import AuthProviders from "../../../../di/authProviders";
import CoreProviders from "../../../../di/coreProviders";
import LoginRequest from "../requests/loginRequest";
import SignupRequest from "../requests/signupRequest";
import Profile, { Role } from "../../domain/models/profile";
import RequestPasswordResetRequest from "../requests/requestPasswordResetRequest";
import VerifyResetTokenRequest from "../requests/verifyResetTokenRequest";
import ResetPasswordRequest from "../requests/resetPasswordRequest";
import AuthenticationStatus from "../../domain/models/authenticationStatus";
import ProfileRepository from "./profileRepossitory";
import RepositoryProvider from "@/di/repositoryProviders";

// Mock dependencies
jest.mock("../../../../di/coreProviders");
jest.mock("../../../../di/authProviders");
jest.mock("./profileRepossitory");
jest.mock("@/apps/core/infrastructure/repositories/departmentRepository");

describe("AuthRepository", () => {
    let authRepository: AuthRepository;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let networkClientMock: jest.Mocked<any>;
    let keyPairStorageMock: jest.Mocked<any>;
    // let profileRepositoryMock: jest.Mocked<ProfileRepository>;

    beforeEach(() => {
        networkClientMock = {
            execute: jest.fn(),
        };

        keyPairStorageMock = {
            store: jest.fn(),
            clean: jest.fn(),
        };

    
        // Mock the providers to return the mocks
        (CoreProviders.provideNetworkClient as jest.Mock).mockReturnValue(networkClientMock);
        (AuthProviders.provideKeyPairStorage as jest.Mock).mockReturnValue(keyPairStorageMock);
        (AuthProviders.provideKeyPair as jest.Mock).mockResolvedValue({ publicKey: "mockPublicKey" });

        authRepository = RepositoryProvider.provide(AuthRepository);

    });

    it("should login correctly", async () => {
        const username = "testUser";
        const password = "testPassword";
        const keyPair = { publicKey: "mockPublicKey", privateKey: "mockPrivateKey" };

        networkClientMock.execute.mockResolvedValue(keyPair);

        await authRepository.login(username, password);

        expect(networkClientMock.execute).toHaveBeenCalledWith(new LoginRequest(username, password));
        expect(keyPairStorageMock.store).toHaveBeenCalledWith(keyPair);
    });

    it("should logout correctly", async () => {
        await authRepository.logout();

        expect(keyPairStorageMock.clean).toHaveBeenCalled();
    });

    it("should signup correctly", async () => {
        const username = "testUser";
        const invitationId = "invitationId";
        const password = "testPassword";
        const keyPair = { publicKey: "mockPublicKey", privateKey: "mockPrivateKey" };

        networkClientMock.execute.mockResolvedValue(keyPair);

        await authRepository.signup(username, invitationId, password);

        expect(networkClientMock.execute).toHaveBeenCalledWith(new SignupRequest(username, invitationId, password));
        expect(keyPairStorageMock.store).toHaveBeenCalledWith(keyPair);
    });

    it("should complete profile correctly", async () => {
        const profileRepositoryMock = {
            create: jest.fn(),
            getByUserKey: jest.fn(),
          };

        jest.spyOn(authRepository,'profileRepository','get').mockReturnValue(profileRepositoryMock as unknown as ProfileRepository);
        const keys = {publicKey:'publicKey'};
        (AuthProviders.provideKeyPair as jest.Mock).mockResolvedValue(keys);
        const username = "testUser";
        const name = "Test User";
        const role = Role.admin;
        const organizationId = "orgId";

        await authRepository.completeProfile(username, name, role, organizationId);

        expect(profileRepositoryMock.create).toHaveBeenCalledWith(
            expect.any(Profile)
        );
    });

    it("should return the current profile", async () => {
        const profileRepositoryMock = {
            create: jest.fn(),
            getByUserKey: jest.fn(),
          };

        jest.spyOn(authRepository,'profileRepository','get').mockReturnValue(profileRepositoryMock as unknown as ProfileRepository);
        const keys = {publicKey:'publicKey'};
        (AuthProviders.provideKeyPair as jest.Mock).mockResolvedValue(keys);
        const profile = new Profile("Test User", Role.admin, "mockPublicKey", "testUser", "orgId");

       profileRepositoryMock.getByUserKey.mockResolvedValue(profile);

        const result = await authRepository.whoAmI();

        expect(result).toBe(profile);
        expect(profileRepositoryMock.getByUserKey).toHaveBeenCalledWith('publicKey');
    });

    it("should request password reset correctly", async () => {
        const email = "test@example.com";

        await authRepository.requestPasswordReset(email);

        expect(networkClientMock.execute).toHaveBeenCalledWith(new RequestPasswordResetRequest(email));
    });

    it("should verify reset token correctly", async () => {
        const token = "resetToken";

        networkClientMock.execute.mockResolvedValue(null);

        const result = await authRepository.verifyResetToken(token);

        expect(networkClientMock.execute).toHaveBeenCalledWith(new VerifyResetTokenRequest(token));
        expect(result).toBe(true);
    });

    it("should fail to verify reset token with an error", async () => {
        const token = "resetToken";

        networkClientMock.execute.mockRejectedValue(new Error("Invalid token"));

        const result = await authRepository.verifyResetToken(token);

        expect(networkClientMock.execute).toHaveBeenCalledWith(new VerifyResetTokenRequest(token));
        expect(result).toBe(false);
    });

    it("should reset password correctly", async () => {
        const token = "resetToken";
        const password = "newPassword";

        await authRepository.resetPassword(token, password);

        expect(networkClientMock.execute).toHaveBeenCalledWith(new ResetPasswordRequest(token, password));
    });

    it("should get authentication status correctly", async () => {
        const profileRepositoryMock = {
            getByUserKey: jest.fn(),
        }

        const profile = new Profile("Test User", Role.admin, "mockPublicKey", "testUser", "orgId");

        jest.spyOn(authRepository, 'profileRepository', 'get').mockReturnValue(profileRepositoryMock as unknown as ProfileRepository);
        (AuthProviders.provideKeyPair as jest.Mock).mockResolvedValue({ publicKey: 'publicKey' });
        profileRepositoryMock.getByUserKey.mockResolvedValue(profile);

        const status = await authRepository.getAuthenticationStatus();

        expect(status).toBe(AuthenticationStatus.admin);
    });

    test('getOrgId should return organization ID', async () => {
        const profileRepositoryMock = {
          getByUserKey: jest.fn(),
        };
        const profile = new Profile('name', Role.admin, 'publicKey', 'username', 'organizationId');
    
        jest.spyOn(authRepository, 'profileRepository', 'get').mockReturnValue(profileRepositoryMock as unknown as ProfileRepository);
        (AuthProviders.provideKeyPair as jest.Mock).mockResolvedValue({ publicKey: 'publicKey' });
        profileRepositoryMock.getByUserKey.mockResolvedValue(profile);
    
        const orgId = await authRepository.getOrgId();
    
        expect(orgId).toBe('organizationId');
      });


});